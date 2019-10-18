import React, { useState, useEffect } from 'react';

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
      filtered = filtered[0].map(a=>a.test);
      setHeader(filtered);
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
       return <th key={index}>{key}</th>
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
    return headersums.map((index) => {
       return <th>{index}</th>
    })
  }
  const renderTableRow = (data) => {
    if (!data) {
      return
    }
    else {
      return data.map((student, index) => {
        return (
          <tr>
              <td><div>{student.firstname}</div><div>{student.lastname}</div></td>
              <td>{student.average}</td>
              {
                student.scores.map((value, index) => {
                  return <td>{value.score}</td>
                })
              }
          </tr>
        )
      })
    }
  }
  return (
    <div>
       <table id='students'>
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