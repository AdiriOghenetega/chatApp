import { isRouteErrorResponse,useRouteError } from "react-router-dom";


export default function ErrorPage() {
  const error  = useRouteError() ;
  console.error(error);

  if (isRouteErrorResponse(error)){

      return (
        <div className="bg-white h-screen flex flex-col justify-center items-center   ">
          <div className="h-[25%] flex flex-col justify-around">
          <h1 className="text-3xl font-bold">Oops!</h1>
          <p className="text-sm">Sorry, an unexpected error has occurred.</p>
          <p className="text-sm text-gray-600">
            <i>{error.data.toUpperCase() || error.statusText.toUpperCase() || "UNKOWN ERROR"}😅</i>
          </p>
          </div>
        </div>
      );
  }
  return (
    <>
    <h1>Unknown Error</h1>
    </>
  )
}