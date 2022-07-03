import React, { useState } from 'react';
import './App.css';
import { Button, Card, Checkbox, Divider, Input } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CloseCircleTwoTone } from '@ant-design/icons';
import { json } from 'stream/consumers';

function App() {
  const range = (n: number): number[] => {
    let i, arr = []
    for (i = 0; i < n; i++) {
      arr.push(i)
    }
    return arr
  }

  interface ITodoItem {
    title: string,
    isDone: boolean,
    isDelete: boolean
  }

  const list: Array<ITodoItem> = [
    {
      title: '学习英语',
      isDelete: false,
      isDone: false
    },
    {
      title: '学习数学',
      isDelete: false,
      isDone: false
    },
    {
      title: '学习语文',
      isDelete: false,
      isDone: false
    },
  ]

  const [getList, setList] = useState(list)
    , [newItem, setNewItem] = useState<ITodoItem>()
    , [title, setTitle] = useState<string>('')

  const clone = (arr: Array<any>) => {
    return JSON.parse(JSON.stringify(arr))
  }

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value

    setTitle(newValue)
  }

  const handleInsert = (title: string) => {
    getList.push({
      title,
      isDelete: false,
      isDone: false
    })

    setList(clone(getList))
  }

  function handleSubmit(e: React.KeyboardEvent<HTMLInputElement>): void {
    console.log('触发了')
    if (e.key === 'Enter') {
      handleInsert(title)
    }
  }

  const onChange = (e: CheckboxChangeEvent, arr: Array<ITodoItem>, index: number) => {
    arr[index].isDone = !arr[index].isDone
    setList(clone(arr))
  };

  const handleDelete = (index: number) => {
    getList[index].isDelete = true
    setList(clone(getList))
  }

  return (
    <div className="App">
      <h1>任务清单</h1>
      <Card>
        <>
          <div className="new">
            <Input onInput={e => handleInput(e)} value={title} onKeyUp={(e) => handleSubmit(e)} ></Input>
          </div>
          <Divider></Divider>
          {
            getList.map((item, index) => {
              if (!item.isDone && !item.isDelete)
                return (
                  <div className="item" key={index}>
                    <Checkbox checked={item.isDone} onChange={(e) => onChange(e, getList, index)}></Checkbox>
                    <div className="des">{item.title}</div>
                    <CloseCircleTwoTone className="close" onClick={() => handleDelete(index)} />
                  </div>
                )
            })
          }
        </>
      </Card>

      <Divider></Divider>

      <h1>已完成任务-test</h1>
      <Card>
        <div>
          {
            getList.map((item, index) => {
              if (item.isDone && !item.isDelete) {
                return (
                  <div className="item" key={index}>
                    <Checkbox checked={item.isDone} onChange={(e) => onChange(e, getList, index)}></Checkbox>
                    <div className="des">{item.title}</div>
                    <CloseCircleTwoTone className="close" onClick={() => handleDelete(index)} />
                  </div>
                )
              }
            })
          }
        </div>
      </Card>
    </div>
  );
}


export default App;