export default function LearningLoop() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#dce4dc] px-[6vw] py-[7vh] text-[#202437]">
      <div className="absolute right-[-8vw] top-[-10vw] h-[30vw] w-[30vw] rounded-full border-[2.5vw] border-[#3e8a78]/15" />
      <div className="small-caps text-[#3e8a78]">06 · The feedback loop</div>
      <h1 className="mt-[2vh] max-w-[70vw] font-display text-[4.2vw] font-extrabold leading-[0.98] tracking-[-0.07em]">
        The product is designed to learn with the team
      </h1>
      <div className="relative mt-[8vh] grid grid-cols-[1.2fr_0.8fr] gap-[7vw]">
        <div className="space-y-[3.2vh]">
          <div className="flex gap-[1.4vw]"><div className="flex h-[3.2vw] w-[3.2vw] shrink-0 items-center justify-center rounded-full bg-[#f7cb4d] font-mono text-[1.3vw]">01</div><div className="font-body text-[1.8vw] font-semibold leading-[1.2]">Strong concepts combine specific tension, human payoff, and product detail</div></div>
          <div className="flex gap-[1.4vw]"><div className="flex h-[3.2vw] w-[3.2vw] shrink-0 items-center justify-center rounded-full bg-[#f7cb4d] font-mono text-[1.3vw]">02</div><div className="font-body text-[1.8vw] font-semibold leading-[1.2]">Analytics surfaces what earned attention</div></div>
          <div className="flex gap-[1.4vw]"><div className="flex h-[3.2vw] w-[3.2vw] shrink-0 items-center justify-center rounded-full bg-[#f7cb4d] font-mono text-[1.3vw]">03</div><div className="font-body text-[1.8vw] font-semibold leading-[1.2]">Creative signals turn performance into practical guidance</div></div>
          <div className="flex gap-[1.4vw]"><div className="flex h-[3.2vw] w-[3.2vw] shrink-0 items-center justify-center rounded-full bg-[#f7cb4d] font-mono text-[1.3vw]">04</div><div className="font-body text-[1.8vw] font-semibold leading-[1.2]">The next brief starts with more context than the last</div></div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="flex h-[24vw] w-[24vw] items-center justify-center rounded-full border-[1.5vw] border-[#3e8a78]/25">
            <div className="flex h-[15vw] w-[15vw] flex-col items-center justify-center rounded-full bg-[#202437] text-center font-display text-[2.4vw] font-bold leading-[1.05] text-[#f6f3ed]"><span>next</span><span>brief</span></div>
          </div>
          <div className="absolute right-[1vw] top-[1vw] h-[3vw] w-[3vw] rounded-full bg-[#f7cb4d]" />
          <div className="absolute bottom-[2vw] left-[2vw] h-[1.6vw] w-[1.6vw] rounded-full bg-[#e7a078]" />
        </div>
      </div>
    </div>
  );
}