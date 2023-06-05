import { useState } from 'react';

interface Props {
  onSubmit: (username: string) => void;
}

const UsernameForm: React.FC<Props> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter the name mentioned on gov. Id"
        className='bg-white w-full border border-slate-300 text-gray-800 rounded-md py-2 pl-6 pr-3 shadow-sm  sm:text-sm"'
      />
      <button type="submit" className='rounded-full bg-gray-900 px-7 py-3 mt-3'>Submit</button>
    </form>
  );
};

export default UsernameForm;
