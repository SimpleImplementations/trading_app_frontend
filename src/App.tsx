
async function getData(): Promise<void> {
  const url: string = "http://localhost:8002/api/market_data/mock_broker_always_new_data";;
  try {
    const response: Response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error((error as Error).message);
  }
}


function App() {

  return (
    <>
      <h1>Vite + React</h1>
      <button onClick={getData}>Get Data</button>
    </>
  )
}

export default App
