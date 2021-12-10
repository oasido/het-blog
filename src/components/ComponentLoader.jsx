import ContentLoader from "react-content-loader"

const ComponentLoader = (props) => {
 return (
  <ContentLoader 
    speed={1}
    width={64}
    height={62}
    viewBox="0 0 64 64"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="31" cy="31" r="31" />
  </ContentLoader>
 );
}
 
export default ComponentLoader;