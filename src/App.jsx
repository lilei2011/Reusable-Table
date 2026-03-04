import SelectableTable from "./SelectableTable";
import basicData from "./data/basicData";
import advancedData from "./data/advancedData";

function App() {
  return (
    <div>
      <SelectableTable data={basicData} name="Basic Data" />
      <SelectableTable data={advancedData} name="Advanced Data" />
      <SelectableTable data={basicData} isSelectable={false} />
    </div>
  );
}

export default App;
