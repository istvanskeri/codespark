import React, { useState, useEffect } from 'react';
import moment from 'moment'
import styles from '../styles/app.css'

const useFetch = url => {
  const [data, setData] = useState(null);
  const [header, setHeader] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      var filtered = json.map( (a) => {
        return a.scores
      });
      setHeader(filtered[0]);
    }
    fetchData()
  },[url]);
  return [data, header];
};

const ScoresComponent =  (props) => {
  const [ data, header ] = useFetch("http://localhost:3000/users")

  const renderTableHeader = (header) => {
    if (!header) {
      return
    }
    return header.map((key, index) => {
       return (
        <th key={index}>
          <span className='vertical'>
            <span className='blue-text'>{key.test}</span><br></br>
            <span className='grey-text'>{moment(key.date).format("MMMM D")}</span>
          </span>
        </th>
       )
    })
  }
  const renderSum = (data,header) => {
    if (!data || !header) {
      return
    }
    let headersums = [];
    for(let i = 0; i<header.length; i++) {
      let total = 0;
      for(let j = 0; j<data.length; j++) {
        if(data[j].scores[i].score)
          total = total + data[j].scores[i].score;
      }
      headersums.push(Math.floor(total/data.length));
    }
    return headersums.map((classAverage) => {
       return <th className='clear'><div className='whitecol-header'>{classAverage}%</div></th>
    })
  }
  const renderTableRow = (data) => {
    if (!data) {
      return
    }
    else {
      return data.map((student, index) => {
        return (
          <tr className='bordertop'>
              <td className='user-name'><div className='blue-text'>{student.firstname}</div><div className='grey-text'>{student.lastname}</div></td>
              <td className='clearcol'>{student.average}%</td>
              {
                student.scores.map((value, index) => {
                  return <td><div className='whitecol'>{value.score}%</div></td>
                })
              }
          </tr>
        )
      })
    }
  }
  return (
    <div>
       <table className='table'>
          <tbody>
             <tr>
               <th></th>
               <th></th>
               {renderTableHeader(header)}
            </tr>
            <tr>
               <th></th>
               <th></th>
               {renderSum(data, header)}
            </tr>
            {renderTableRow(data)}
          </tbody>
       </table>
    </div>
  );
}

export default ScoresComponent;