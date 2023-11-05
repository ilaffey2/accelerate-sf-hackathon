'use client'
import type OpenAI from 'openai'
import { useEffect, useRef, useState } from 'react'
import SuggestedPrompts from '../components/SuggestedPrompts';
import Modal from './Modal';
import Link from 'next/link';
// import * as echarts from 'echarts';

// type EChartsOption = echarts.EChartsOption;

import Table from './Table'
import ResponseComp from './ResponseComp';


const Form = ({ modelsList }: { modelsList: OpenAI.ModelsPage }) => {
  const messageInput = useRef<HTMLTextAreaElement | null>(null)
  const submitButtonRef = useRef<HTMLButtonElement | null>(null); // Ref for the submit button

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);


  // causes rerender without useEffect due to suspense boundary
  // const storedResponse = typeof localStorage !== 'undefined' ? localStorage.getItem('response') : null;
  // const initialHistory = storedResponse ? JSON.parse(storedResponse) : [];
  // const [history, setHistory] = useState<string[]>(initialHistory);
  const [history, setHistory] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [models, setModels] = useState<ModelType[]>([])
  const [models, setModels] = useState(modelsList.data)
  const [currentModel, setCurrentModel] = useState<string>('gpt-4')

  const handlePromptSelection = (promptText: string) => {
    if (messageInput.current) {
      messageInput.current.value = promptText;
      // "Click" the submit button programmatically
      submitButtonRef.current?.click();
    }
  };
  const [tableData, setTableData] = useState<string[][][]>([])

  // const tableContainerRef = useRef<any>(null);

  // useEffect(() => {
  //   const container = tableContainerRef.current;
  //   console.log('container', container)

  //   if (!container) return;
  //   const handleWheel = (e: any) => {
  //     if (e.deltaY === 0) return;
  //     e.preventDefault();
  //     container.scrollLeft += e.deltaY;
  //   };

  //   container.addEventListener('wheel', handleWheel);

  //   return () => {
  //     container.removeEventListener('wheel', handleWheel);
  //   };
  // }, [tableData]);

  const handleEnter = (
    e: React.KeyboardEvent<HTMLTextAreaElement> &
      React.FormEvent<HTMLFormElement>
  ) => {
    if (e.key === 'Enter' && isLoading === false) {
      e.preventDefault()
      setIsLoading(true)
      handleSubmit(e)
    }
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Assuming messageInput is a ref to your input element
    const message = messageInput.current?.value;
    if (!message) {
      return; // Don't proceed if the message is empty
    }

    setHistory((prev) => [...prev, message]); // Add the message to the history

    messageInput.current!.value = ''; // Clear the input field

    try {
      setIsLoading(true); // Set loading state before the request


      console.log('Sending message:', message)
      // Use the postQuestion function to send the message to the API
      const response = await fetch('/api/textResponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: message,
        }),
      })

      const responseData = await response.json();
      console.log('API Response:', responseData)
      console.log('API Response Summary:', responseData.data.summary);
      console.log('API Response Table:', responseData.data.table)
      // setTableData(responseData.data.table)
      setTableData((prev) => [...prev, responseData.data.table]); // Add the response to the history


      setHistory((prev) => [...prev, responseData.data.summary]); // Add the response to the history





      // const response2 = await fetch('/api/imgResponse', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   // body: JSON.stringify({
      //   //   question: message,
      //   // }),
      // })

      // const responseData2 = await response2.json();
      // console.log('API Image Response:', responseData2.data.imageString)




    } catch (error) {
      // Handle any errors from the API request
      console.error('API Request failed:', error);
    } finally {
      setIsLoading(false); // Reset loading state after the request
    }
  };


  const handleReset = () => {
    localStorage.removeItem('response')
    setHistory([])
  }

  // Save the 'history' state to 'localStorage' whenever it changes
  useEffect(() => {
    localStorage.setItem('response', JSON.stringify(history))
  }, [history])

  // Initialize 'history' state from 'localStorage' when the component mounts
  useEffect(() => {
    const storedResponse = localStorage.getItem('response')
    if (storedResponse) {
      setHistory(JSON.parse(storedResponse))
    }
  }, [])

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentModel(e.target.value)
  }

  return (
    <div className='flex justify-center max-w-screen overflow-x-auto'>

      <div className='fixed left-[20px] top-[35px] text-blue-500 underline'><Link href="https://openbook.sfgov.org/">Source</Link></div>
      <button
        onClick={handleReset}
        type='reset'
        className='fixed top-5 right-5 p-4 rounded-md bg-white text-gray-500 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent'
      >
        Clear History
      </button>
      {history.length === 0 && (
        <div className='fixed left-[33%] mt-8 font-semibold text-lg text-decoration-line: underline'>
          Ask anything about SF government spending, contracts, etc!
        </div>
      )}

      {history.length === 0 && (
        <button
          onClick={toggleModal}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg bg-white text-gray-500 shadow-lg font-bold border-1 hover:bg-gray-200 transition-colors duration-[800ms] ease-in-out"
        >
          What is this?
        </button>
      )}

      {/* Modal Component */}
      <Modal show={isModalOpen} onClose={toggleModal}>
        <p className='text-center'>Hey! We pulled all of the data from the <Link className="text-blue-500" href="https://openbook.sfgov.org/">https://openbook.sfgov.org/</Link> government site and synthesised everything into this easy interface! Ask anything about SF government spending, contracts, etc! </p>
      </Modal>

      <div className='w-full h-80vh mx-2 flex flex-col items-start gap-3 pt-6 last:mb-6 md:mx-auto md:max-w-3xl mb-[100px]'>
        {isLoading
          ? history.map((item: any, index: number) => {
            return (
              <div key={index}>
                <ResponseComp
                  key={index}
                  item={item}
                  index={index}
                  tableData={tableData[(index - 1) / 2]}
                //isTableVisible={isTableVisible}
                //setTableVisible={setTableVisible}
                //tableContainerRef={tableContainerRef}
                />
              </div>
            )
          })
          : history
            ? history.map((item: string, index: number) => {
              return (
                <div key={index}>
                  <ResponseComp
                    key={index}
                    item={item}
                    index={index}
                    tableData={tableData[(index - 1) / 2]}
                  //isTableVisible={isTableVisible}
                  //setTableVisible={setTableVisible}
                  //tableContainerRef={tableContainerRef}
                  />
                </div>
              )
            })
            : null}
        {/* <div className='w-full mx-2 flex flex-col items-start gap-3 pt-6 last:mb-6 md:mx-auto md:max-w-6xl'>
          {tableData && tableData.length > 0 &&
            (
              <button onClick={() => setTableVisible(!isTableVisible)} className="p-2 rounded-md bg-blue-500 text-white">
                {isTableVisible ? 'Hide Table' : 'Show Table'}
              </button>)
          }
          {tableData && tableData.length > 0 && (
            <>

              <div ref={tableContainerRef} style={{ maxWidth: '100%', maxHeight: '550px', marginLeft: 'auto', marginRight: 'auto', overflowX: 'auto' }} className={isTableVisible ? '' : 'hidden'}>
                <Table data={tableData} />
              </div>
            </>
          )}
        </div> */}
      </div>
      <div className='fixed bottom-20'>
        {history.length === 0 && (
          <SuggestedPrompts onPromptSelect={handlePromptSelection} />
        )}
      </div>





      <form
        onSubmit={handleSubmit}
        className='fixed bottom-0 w-full md:max-w-3xl bg-white rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] mb-4'
      >
        <textarea
          name='Message'
          placeholder='Submit a message'
          ref={messageInput}
          onKeyDown={handleEnter}
          className='w-full resize-none bg-white outline-none pt-4 pl-4 translate-y-1'
        />
        <button
          ref={submitButtonRef} // Set the ref here
          disabled={isLoading}
          type='submit'
          className='absolute top-[1.4rem] right-5 p-1 rounded-md text-gray-500 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent'
        >
          <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth='0'
            viewBox='0 0 20 20'
            className='h-4 w-4 rotate-90'
            height='1em'
            width='1em'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
          </svg>
        </button>
      </form>
    </div>
  )
}

export default Form