import React,{useState,useEffect} from 'react';
import NavBar from '../component/NavBar';

import "bootstrap/dist/css/bootstrap.css";
import { Button, Col, Row, Table } from "react-bootstrap";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableColumnType,
  TableHeader
} from "react-bs-datatable";

// Create table headers consisting of 4 columns.
const STORY_HEADERS = [
  {
    prop: "identification_number",
    title: "Identification Number",
    isFilterable: true
  },
  {
    prop: "name",
    title: "Name"
  },
  {
    prop: "last_name",
    title: "Last Name"
  },
  {
    prop: "date_of_birth",
    title: "Date Of Birth"
  },
  {
    prop: "date_of_issue",
    title: "Date Of Issue"
  },
  {
    prop: "date_of_expiry",
    title: "Date Of Expiry"
  }
];

// Then, use it in a component.
function TableComponent() {
    const [tableBody,setTableBody] = useState([])
    useEffect(()=>{
        fetch("http://localhost:5001/citizens")
        .then(response =>{
            response.json()
            .then(data=>{
                setTableBody(data)
            })
        })
    },[])
  return (
    <DatatableWrapper
      body={tableBody}
      headers={STORY_HEADERS}
      paginationOptionsProps={{
        initialState: {
          rowsPerPage: 10,
          options: [5, 10, 15, 20]
        }
      }}
    >
      <Row className="mb-4 p-2">
        <Col
          xs={12}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Filter />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
        >
          <PaginationOptions />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Pagination />
        </Col>
      </Row>
      <Table>
        <TableHeader />
        <TableBody />
      </Table>
    </DatatableWrapper>
  );
}

export default function Show() {
  return (
    <>
        <NavBar/>
        <TableComponent/>
    </>
  )
}
