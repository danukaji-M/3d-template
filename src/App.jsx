import LogoSpinner from "./components/LogoSpinner"

function App() {
  return (
    <div className="relative w-screen h-screen">
      <h1 className="absolute font-sans text-4xl text-gray-100 underline top-2 left-2">
        Logo Spinner
      </h1>
      <div className="flex items-center justify-center h-full">
        <LogoSpinner />
      </div>
    </div>
  )
}

export default App
