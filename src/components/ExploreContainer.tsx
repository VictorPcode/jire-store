import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div id="container">
      <strong>{name}</strong>
      <p> <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">ENCUENTRALO!</a></p>
    </div>
  );
};

export default ExploreContainer;
