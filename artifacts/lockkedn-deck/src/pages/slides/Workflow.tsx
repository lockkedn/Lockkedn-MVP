export default function Workflow() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#f6f3ed] px-[6vw] py-[7vh]">
      <div className="small-caps text-[#3e8a78]">05 · The workflow</div>
      <h1 className="mt-[2vh] max-w-[72vw] font-display text-[4.2vw] font-extrabold leading-[0.98] tracking-[-0.07em] text-[#202437]">
        From product link to publish-ready idea
      </h1>
      <div className="relative mt-[8vh] grid grid-cols-6 gap-[1vw]">
        <div className="border-t-[0.35vw] border-[#f7cb4d] pt-[2vh]"><div className="font-mono text-[1.5vw] text-[#3e8a78]">01</div><div className="mt-[2vh] font-body text-[1.8vw] font-semibold leading-[1.16]">Add a product URL and working name</div></div>
        <div className="border-t-[0.35vw] border-[#f7cb4d] pt-[2vh]"><div className="font-mono text-[1.5vw] text-[#3e8a78]">02</div><div className="mt-[2vh] font-body text-[1.8vw] font-semibold leading-[1.16]">Choose a format and platform</div></div>
        <div className="border-t-[0.35vw] border-[#f7cb4d] pt-[2vh]"><div className="font-mono text-[1.5vw] text-[#3e8a78]">03</div><div className="mt-[2vh] font-body text-[1.8vw] font-semibold leading-[1.16]">Generate a concept with a hook and caption</div></div>
        <div className="border-t-[0.35vw] border-[#f7cb4d] pt-[2vh]"><div className="font-mono text-[1.5vw] text-[#3e8a78]">04</div><div className="mt-[2vh] font-body text-[1.8vw] font-semibold leading-[1.16]">Move the idea through the queue</div></div>
        <div className="border-t-[0.35vw] border-[#f7cb4d] pt-[2vh]"><div className="font-mono text-[1.5vw] text-[#3e8a78]">05</div><div className="mt-[2vh] font-body text-[1.8vw] font-semibold leading-[1.16]">Schedule it on the calendar</div></div>
        <div className="border-t-[0.35vw] border-[#3e8a78] pt-[2vh]"><div className="font-mono text-[1.5vw] text-[#3e8a78]">06</div><div className="mt-[2vh] font-body text-[1.8vw] font-semibold leading-[1.16]">Feed performance signals back into the next idea</div></div>
      </div>
      <div className="absolute bottom-[7vh] left-[6vw] right-[6vw] grid grid-cols-[1fr_1fr] items-end gap-[8vw]">
        <div className="h-[14vh] rounded-[1vw] bg-[#202437] p-[1.7vw] text-[#f6f3ed]">
          <div className="small-caps text-[#f7cb4d]">The handoff</div>
          <div className="mt-[2vh] font-body text-[1.55vw] font-semibold">Context stays attached as the idea moves.</div>
        </div>
        <div className="font-body text-[1.8vw] leading-[1.35] text-[#667078]">
          Every state change creates a clearer next action for the team.
        </div>
      </div>
    </div>
  );
}