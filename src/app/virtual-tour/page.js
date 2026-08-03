export const metadata = {
  title: "Virtual Campus Tour | Holy Fathima Kidz High School",
  description: "Experience our premium campus virtually.",
};

export default function VirtualTourPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 md:px-6 py-12 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">Experience Our Campus</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
          Take a 360-degree virtual tour of our state-of-the-art facilities, smart classrooms, and sprawling sports complex.
        </p>
        
        <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          {/* Virtual Tour Embed Placeholder - In production this would be an iframe to a 360 tour provider like Matterport */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <iframe 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&controls=0" 
              className="absolute inset-0 w-full h-full opacity-60"
              allow="autoplay; encrypted-media"
            ></iframe>
            <div className="relative z-10 p-8 bg-black/50 backdrop-blur-md rounded-xl border border-white/20">
              <h2 className="text-2xl font-bold font-poppins mb-2">Interactive 360° Tour</h2>
              <p className="text-sm text-gray-300">Integration ready for Matterport or custom WebGL tour.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
