import Form from "./Form";

export default function HeroForm() {
  return (
    <div className="relative w-screen h-dvh overflow-x-hidden">
      <video
        src="/Video/forex.mp4"
        loop
        muted
        autoPlay
        className="absolute top-0 w-full h-dvh object-cover object-center -z-10"
      />
      <div className="flex items-center justify-end w-full h-full relative z-10 px-10">
        <Form />
      </div>
    </div>
  );
}
