const App = () => {
  const [liked, setLiked] = React.useState(false);
  React.useEffect(() => {
    console.log('liked', liked);
  }, [liked]);
  return (
    <button onClick={() => setLiked(true)}>
      Like
    </button>
  );
}

const domContainer = document.querySelector('#react_app');
const root = ReactDOM.createRoot(domContainer);
root.render(<App />);