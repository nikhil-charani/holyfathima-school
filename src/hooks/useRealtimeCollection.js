import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy, limit as limitDocs, where } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export function useRealtimeCollection(collectionName, options = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let q = collection(db, collectionName);
    
    const constraints = [];

    if (options.whereQuery) {
      constraints.push(where(options.whereQuery[0], options.whereQuery[1], options.whereQuery[2]));
    }
    
    if (options.orderByField) {
      constraints.push(orderBy(options.orderByField, options.orderDirection || "desc"));
    }

    if (options.limitTo) {
      constraints.push(limitDocs(options.limitTo));
    }

    if (constraints.length > 0) {
      q = query(q, ...constraints);
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(results);
        setLoading(false);
      },
      (err) => {
        console.error(`Error fetching collection ${collectionName}:`, err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, JSON.stringify(options)]); // Stringify to avoid infinite re-renders if object reference changes

  return { data, loading, error };
}
