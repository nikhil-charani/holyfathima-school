import AdmissionForm from "@/components/admissions/AdmissionForm";

export const metadata = {
  title: "Admissions | Holy Fathima Kidz High School",
  description: "Apply for admission to Holy Fathima Kidz High School for the upcoming academic year.",
};

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen bg-muted/20 pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold font-poppins text-foreground mb-4">
            Admissions <span className="text-primary">2026-2027</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Join the Holy Fathima family. Please fill out the application form below and our admissions team will get in touch with you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AdmissionForm />
          </div>
          
          <div className="space-y-6">
            <div className="bg-primary text-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold font-poppins mb-4">Admission Process</h3>
              <ol className="space-y-4 text-sm font-medium">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-primary">1</span>
                  <span>Submit the online application form with documents.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">2</span>
                  <span>Application review by the admissions committee.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">3</span>
                  <span>Campus visit and interaction with parents/student.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">4</span>
                  <span>Fee payment and admission confirmation.</span>
                </li>
              </ol>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border">
              <h3 className="text-xl font-bold font-poppins mb-2 text-foreground">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you have any questions during the application process, please reach out to our admissions office.
              </p>
              <div className="text-sm font-medium">
                <p>Phone: +91 98765 43210</p>
                <p>Email: admissions@holyfathima.edu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
