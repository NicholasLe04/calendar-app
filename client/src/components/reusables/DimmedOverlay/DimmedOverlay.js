import "./DimmedOverlay.css";

function DimmedOverlay(props){
    return <div className="dim-overlay" onClick={props.onClick}></div>;
};
  
export default DimmedOverlay;