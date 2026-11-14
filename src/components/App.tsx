import css from './App.module.css';
import CafeInfo from './CafeInfo.tsx';
import { useState } from 'react';
import type { Votes, VoteType } from '../types/votes.ts';
import VoteOptions from './VoteOptions.tsx';
import VoteStats from './VoteStats.tsx';
import Notification from './Notification.tsx';

export default function App() {
  const initialVotesState = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  const [votes, setVotes] = useState<Votes>(initialVotesState);

  function handleVote(type: VoteType) {
    setVotes({
      ...votes,
      [type]: votes[type] + 1,
    });
  }

  function resetVotes() {
    setVotes(initialVotesState);
  }

  const totalVotes = votes.bad + votes.good + votes.neutral;

  const positiveRate = totalVotes ? Math.round((votes.good / totalVotes) * 100) : 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={totalVotes > 0} />
      {totalVotes > 0 ? (
        <VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate} />
      ) : (
        <Notification />
      )}
    </div>
  );
}
