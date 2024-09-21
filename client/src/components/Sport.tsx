interface SportProps {
    name: string;
    season: string;
    level: string;
  }
  
  const Sport: React.FC<SportProps> = ({ name, season, level }) => {
    return (
      <span>
        <strong>{name}</strong> ({season} - {level})
      </span>
    );
  };
  
  export default Sport;
  