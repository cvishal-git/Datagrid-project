import { DataGrid } from './components/DataGrid';
import { sampleData } from './types';

function App() {
  return (
    <div className="app">
      <h1>Datagrid</h1>
      <DataGrid data={sampleData} />
    </div>
  );
}

export default App;
