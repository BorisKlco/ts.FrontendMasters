import { useEffect, useState } from 'react';
import Loading from './loading';
import InspirationalQuote from './quote';
import Quotes from './quotes';

export type Quote = {
  id: number;
  content: string;
  source?: string;
};

export const fetchRandomQuote = async () => {
  const response = await fetch(`/api/quotes/random`);
  return response.json();
};

export const fetchQuotes = async (count: number) => {
  const response = await fetch(`/api/quotes?limit=${count}`);
  return response.json();
};

const Application = () => {
  const [quote, setQuote] = useState<Quote | undefined>();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [count, setCount] = useState(10);

  useEffect(() => {
    fetchRandomQuote().then(setQuote);
  }, []);

  if (!quote) return <Loading />;
  return (
    <main className="mx-auto w-full max-w-2xl py-16">
      <InspirationalQuote content={quote.content} source={quote.source} />
      <Quotes
        count={count}
        onSubmit={() => fetchQuotes(count).then(setQuotes)}
        onChange={(e) => setCount(+e.target.value)}
      >
        <div className="grid grid-cols-2 gap-4"></div>
        {quotes.map((quote) => (
          <InspirationalQuote
            key={quote.id}
            content={quote.content}
            source={quote.source}
          />
        ))}
      </Quotes>
    </main>
  );
};

export default Application;
