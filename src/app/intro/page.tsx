import Head from 'next/head';
import TestSpan from '@/components/testSpan';

const Home = () => {

  const text = "하이";

  return (
    <div>
      <main>
        <TestSpan text={text}></TestSpan>
      </main>
    </div>
  );
};

export default Home;
