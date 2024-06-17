

export default function Home() {
  return (
    <main>
      <div className="flex items-center justify-between p-16 px-40 text-lightblack">
        <div className="text-6xl font-bold">VC</div>
        <div className="flex items-row text-4xl space-x-24">
          <div>Portfolio</div>
          <div>About</div>
          <div>Contact</div>
        </div>
      </div>
      <div className="p-40 pt-48">
        <div className="text-12xl font-bold text-lightblack leading-none">VICTOR CHUNG</div>
        <div className="mt-2 px-8">
          <div className="text-7xl font-bold text-skyblue">Full Stack Developer</div>
          <div className="mt-4">
            <button className="rounded bg-white text-3xl p-6 mr-8">View Portfolio</button>
            <button className="rounded bg-white text-3xl p-6">View Resume</button>
          </div>
        </div>
      </div>
    </main>
  );
}
