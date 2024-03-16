import Image from 'next/image'
import idea from "../../public/idea.png"
import flow from "../../public/working-flow.png"
import Link from 'next/link'
function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Smart Data Injector</h1>
      <Link href="https://s3.amazonaws.com/cad-2.0/Screen+Recording+2024-03-16+at+21.04.24.mov">
        <button>Video Link</button>
      </Link> 
      <div>
      <Link href="/api-key-generator">
        <button>Generate API Key</button>
      </Link>

      <Link href="/data-injector">
        <button>Inject Data</button>
      </Link>
      </div>
      
      <br />
      <h2>The Idea</h2>
      <div className="p-8"><Image alt="profile" src={idea} height={800} width={1500} /></div>
      <br />
      <br />
      <h2>The Flow</h2>
      <div className="p-8"><Image alt="profile" src={flow} height={800} width={1500} /></div>
    </div>
  );
}
export default Home;
