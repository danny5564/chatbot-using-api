import Logo from './Logo';
import SuggestionCard from './SuggestionCard';
import { Lightbulb, PenLine, Code, Compass } from 'lucide-react';

const suggestions = [
  { icon: Lightbulb, text: 'Explain complex topics in simple terms' },
  { icon: PenLine, text: 'Help me write or brainstorm ideas' },
  { icon: Code, text: 'Debug code or find solutions' },
  { icon: Compass, text: 'Plan, learn or get recommendations' },
];

export default function WelcomeScreen({ onSend }) {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg text-center">
        <div className="flex justify-center mb-5">
          <Logo size="xl" />
        </div>
        <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-2">
          Chat<span className="text-brand-600 dark:text-brand-400">Flow</span>
        </h1>
        <p className="text-surface-500 dark:text-surface-400 mb-8 text-sm leading-relaxed">
          Your AI companion for ideas, answers
          <br />
          and creative conversations.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {suggestions.map((s, i) => (
            <SuggestionCard
              key={i}
              icon={s.icon}
              text={s.text}
              onClick={() => onSend(s.text)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
