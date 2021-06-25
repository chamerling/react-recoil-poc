import UserList from './components/UserList';
import useSSE from './hooks/useSSE';
import useGetOrFetch from './recoil/hooks/getOrFetch';

function App() {
  useSSE("http://localhost:8888/sse");
  const fetch = useGetOrFetch();

  return (
    <div>
      <UserList/>
      <button onClick={() => fetch()}>Get or fetch</button>
    </div>
  );
}

export default App;
