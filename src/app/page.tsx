export default function Home() {
  return (
    <main>
      <div className="flex items-center justify-between p-16 px-48 text-lightblack">
        <div className="text-6xl font-bold">VC</div>
        <div className="flex items-row text-4xl font-semibold space-x-28">
          <div>Portfolio</div>
          <div>About</div>
          <div>Contact</div>
        </div>
      </div>
      <div className="flex justify-between pt-48 px-48">
        <div className="flex flex-col justify-between">
          <div> 
            <div className="mt-4 text-12xl font-bold text-lightblack leading-none">VICTOR CHUNG</div>
            <div className="mt-2 px-12">
              <div className="text-7xl font-bold text-skyblue">Full Stack Developer</div>
              <div className="mt-6 space-x-8">
                <button className="rounded-lg bg-white text-3xl font-medium p-6 px-8">View Portfolio</button>
                <button className="rounded-lg bg-white text-3xl font-medium p-6 px-8">View Resume</button>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex space-x-4 px-12">
              <button className="flex justify-center items-center rounded-lg bg-skyblue w-16 h-16">
                <img src="/linkedin.png" className="w-14 h-14"/>
              </button>
              <button className="flex justify-center items-center rounded-lg bg-skyblue w-16 h-16">
                <img src="/github.png" className="h-16 w-16"/>
              </button>
            </div>
            <div className="relative">
              <div className="absolute z-10 bottom-40 right-20 w-64 h-56 bg-white rounded-lg"></div>
              <div className="absolute z-10 bottom-0 right-48 w-64 h-56 bg-white rounded-lg"></div>
            </div>
          </div>
        </div>
        <div className="bg-lightblack w-1/4 h-160 rounded-lg">
          <div className="w-full h-full p-6">
            <img src="/profilepic.jpg" alt="profile" className="rounded-lg w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </main>
  );
}
