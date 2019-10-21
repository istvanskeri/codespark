import React, { useState, useEffect } from 'react';
import moment from 'moment'
import '../styles/app.css'

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

const renderTableHeader = (header) => {
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

const getClassAvg = (header,data) => {
  let avg = [];
  for(let i = 0; i<header.length; i++) {
    let total = 0;
    for(let j = 0; j<data.length; j++) {
      if(data[j].scores[i].score)
        total = total + data[j].scores[i].score;
    }
    avg.push(Math.floor(total/data.length));
  }
  return avg;
}

const renderSum = (data,header) => {
  const avg = getClassAvg(header, data);
  return avg.map((classAverage) => {
     return <th className='clear'><div className='whitecol-header'>{classAverage}%</div></th>
  })
}
const renderTableRow = (data) => {
    return data.map((student, index) => {
      return (
        <tr className='bordertop'>
            <td className='user-name'><div className='blue-text'>{student.firstname}</div><div className='grey-text'>{student.lastname}</div></td>
            <td className='clearcol border-right'>{student.average}%</td>
            {
              student.scores.map((value, index) => {
                return (
                  <td testdate={moment(value.date).format("MMMM D")} headers={value.test}>
                    <div className='whitecol'>
                      {value.score }
                      {
                        value.score == null && <span>-</span>
                      }
                      {
                        value.score >= 0 && <span>%</span>
                      }
                    </div>
                  </td> 
                )
              })
            }
        </tr>
      )
    })
}
const renderTableResponsive = (data,header) => {
   const avg = getClassAvg(header,data);
    return data.map((student, index) => {
      return (
        <>
          <tr className='user-name'>
            <td>
              <div className='blue-text responsive-header'>{student.firstname} {student.lastname}</div>
            </td>
            <td colspan="2">
              <div className='blue-text responsive-header'>{student.average}%</div>
            </td>
          </tr>
          <tr className='score'>
            <td>
              <div className='blue-text'></div>
            </td>
            <td>
              <div className='blue-text whitecol-header'>Score</div>
            </td>
            <td>
              <div className='blue-text whitecol-header'>Avg</div>
            </td>
          </tr>
          {
            student.scores.map((value, index) => {
              return (
                <tr className='bordertop'>
                  <td>
                    <div className='blue-text'>
                      {value.test}
                    </div>
                    <div className='grey-text'>
                      {moment(value.date).format("MMMM D")}
                    </div>     
                  </td>
                  <td>
                    <div className='whitecol'>
                    {value.score }
                    {
                      value.score == null && <span>-</span>
                    }
                    {
                      value.score >= 0 && <span>%</span>
                    }
                    </div>
                  </td>
                  <td>
                    <div  className='whitecol'>
                      {avg[index]}
                      {
                        avg[index] >= 0 && <span>%</span>
                      }
                    </div>
                  </td>
                </tr> 
              )
            })
          }
        </>
      )
    })
}

const ScoresComponent =  (props) => {
  const [ data, header ] = useFetch("http://localhost:3000/users")

  return (
    <div className='table-container'>
       <table className='table full'>
          <tbody>
             <tr>
               <th></th>
               <th className='border-right'></th>
               {header && renderTableHeader(header)}
            </tr>
            <tr>
               <th></th>
               <th className='border-right'></th>
               {data && header && renderSum(data, header)}
            </tr>
            {data && renderTableRow(data)}
          </tbody>
       </table>

       <table className='table responsive'>
        <tbody>
          { data && header && renderTableResponsive(data, header)}
        </tbody>
       </table>
       
    </div>
  );
}

export default ScoresComponent;
