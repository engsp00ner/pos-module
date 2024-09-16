interface Props {
  ImageUrl: string;
}

export const Header: React.FC<Props> = ({ ImageUrl }) => {
  return (
    <div>
      <img src={ImageUrl} alt="no-Data" />
    </div>
  );
};
