import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Discover & Share
      <br className='max-md:hidden' />
      <span className='blue_gradient text-center'> AI-Powered Prompts</span>
    </h1>
    <p className='desc text-center'>
      SharePrompt is an AI prompting tool for users to
      discover, create and share creative prompts and copy it to use it directly on ai websites
    </p>

    <Feed />
  </section>
);

export default Home;
