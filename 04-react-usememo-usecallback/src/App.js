import { useCallback, useState, memo, useEffect } from 'react'
import './App.css'
import SyntaxHighlighter, { Light } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';

const DIV1 = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h3>DIV 1 - {count}</h3>
      <button onClick={() => setCount(prev => prev + 1)}>add count</button>
      <DIV1Child />
    </div>
  )
}

const DIV1Child = () => {
  console.log('div 1 child rerender')

  return (
    <div>div 1 child</div>
  )
}

const DIV2 = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h3>DIV 2 - {count}</h3>
      <button onClick={() => setCount(prev => prev + 1)}>add count</button>
      <DIV2Child />
    </div>
  )
}

const DIV2Child = memo(() => {
  console.log('div 2 child rerender')

  return (
    <div>div 2 child</div>
  )
})

const DIV3 = () => {
  const [count, setCount] = useState(0)

  const randomFunc = () => {
    console.log('randomFunc')
  }

  return (
    <div>
      <h3>DIV 3 - {count}</h3>
      <button onClick={() => setCount(prev => prev + 1)}>add count</button>
      <DIV3Child randomFunc={randomFunc} />
    </div>
  )
}

const DIV3Child = memo(({ randomFunc }) => {
  console.log('div 3 child rerender')
  randomFunc()

  return (
    <div>div 3 child</div>
  )
})

const DIV4 = () => {
  const [count, setCount] = useState(0)

  const randomFunc = useCallback(() => {
    console.log('randomFunc')
  }, [])

  return (
    <div>
      <h3>DIV 4 - {count}</h3>
      <button onClick={() => setCount(prev => prev + 1)}>add count</button>
      <DIV4Child randomFunc={randomFunc} />
    </div>
  )
}

const DIV4Child = memo(({ randomFunc }) => {
  console.log('div 4 child rerender')
  randomFunc()

  return (
    <div>div 4 child</div>
  )
})


function App() {
  useEffect(() => {
    Light.registerLanguage('javascript', js);
  }, [])

  return (
    <section style={{ padding: 100 }}>
      <h2>check console</h2>
      <DIV1 />
      <details style={{ marginTop: '10px' }}>
        <summary>source code</summary>
        <SyntaxHighlighter language="js" style={docco} PreTag="div" children={
          `
          const DIV1 = () => {
            const [count, setCount] = useState(0)
          
            return (
              <div>
                <h3>DIV 1 - {count}</h3>
                <button onClick={() => setCount(prev => prev + 1)}>add count</button>
                <DIV1Child />
              </div>
            )
          }
          
          const DIV1Child = () => {
            console.log('div 1 child rerender')
          
            return (
              <div>div 1 child</div>
            )
          }
          `
        } />
      </details>
      <hr />
      <DIV2 />
      <details style={{ marginTop: '10px' }}>
        <summary>source code</summary>
        <SyntaxHighlighter language="js" style={docco} PreTag="div" children={
          `
          const DIV2 = () => {
            const [count, setCount] = useState(0)
          
            return (
              <div>
                <h3>DIV 2 - {count}</h3>
                <button onClick={() => setCount(prev => prev + 1)}>add count</button>
                <DIV2Child />
              </div>
            )
          }
          
          const DIV2Child = memo(() => {
            console.log('div 2 child rerender')
          
            return (
              <div>div 2 child</div>
            )
          })
          `
        } />
      </details>
      <hr />
      <DIV3 />
      <details style={{ marginTop: '10px' }}>
        <summary>source code</summary>
        <SyntaxHighlighter language="js" style={docco} PreTag="div" children={
          `
          const DIV3 = () => {
            const [count, setCount] = useState(0)
          
            const randomFunc = () => {
              console.log('randomFunc')
            }
          
            return (
              <div>
                <h3>DIV 3 - {count}</h3>
                <button onClick={() => setCount(prev => prev + 1)}>add count</button>
                <DIV3Child randomFunc={randomFunc} />
              </div>
            )
          }
          
          const DIV3Child = memo(({ randomFunc }) => {
            console.log('div 3 child rerender')
            randomFunc()
          
            return (
              <div>div 3 child</div>
            )
          })
          `
        } />
      </details>
      <hr />
      <DIV4 />
      <details style={{ marginTop: '10px' }}>
        <summary>source code</summary>
        <SyntaxHighlighter language="js" style={docco} PreTag="div" children={
          `
          const DIV4 = () => {
            const [count, setCount] = useState(0)
          
            const randomFunc = useCallback(() => {
              console.log('randomFunc')
            }, [])
          
            return (
              <div>
                <h3>DIV 4 - {count}</h3>
                <button onClick={() => setCount(prev => prev + 1)}>add count</button>
                <DIV4Child randomFunc={randomFunc} />
              </div>
            )
          }
          
          const DIV4Child = memo(({ randomFunc }) => {
            console.log('div 4 child rerender')
            randomFunc()
          
            return (
              <div>div 4 child</div>
            )
          })
          `
        } />
      </details>
      <hr />
    </section>
  );
}

export default App;
