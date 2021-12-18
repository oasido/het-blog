import ContentLoader from "react-content-loader"

const ComponentLoader = (props) => {
 return (
  <ContentLoader 
    speed={1}
    width={80}
    height={80}
    viewBox="0 0 65 65"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="33" cy="34" r="31" />
  </ContentLoader>
 );
}
 
export default ComponentLoader;