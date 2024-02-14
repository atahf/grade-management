import React, {useState, useEffect} from 'react';
import { Container, ListGroup, Modal, Button, OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap';
import Loading from './Loading';

const GradeList = () => {
    const [filteredGrades, setFilteredSearch] = useState(null);
    const [show, setShow] = useState(false);
    const [data, setData] = useState(null);
    const [searchKey, setSearchKey] = useState('');
    const [loadingAll, setLoadingAll] = useState(false);
    const [errorAll, setErrorAll] = useState(null);
    const [selectedData, setSelectedData] = useState(null);
    const [loadingInfo, setLoadingInfo] = useState(false);
    const [errorInfo, setErrorInfo] = useState(null);
    
    const sorts = [
        {
            value: "default",
            msg: <span>default sort</span>
        },
        {
            value: "id",
            msg: <span>sorted by ID &#x25b4;</span>
        },
        {
            value: "id-desc",
            msg: <span>sorted by ID &#x25be;</span>
        },
        {
            value: "name",
            msg: <span>sorted by Student Name &#x25b4;</span>
        },
        {
            value: "name-desc",
            msg: <span>sorted by Student Name &#x25be;</span>
        },
        {
            value: "score",
            msg: <span>sorted by Grade &#x25b4;</span>
        },
        {
            value: "score-desc",
            msg: <span>sorted by Grade &#x25be;</span>
        },
    ];
    const [sortIdx, setSortIdx] = useState(0);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Click to change sort
        </Tooltip>
    );

    const handleClose = () => {
        setShow(false);
        setSelectedData(null);
    }

    const handleInfo = (id) => {
        fetchInfo(id);
        setShow(true);
    }

    const deleteInfo = async (id) => {
        setLoadingInfo(true);
        fetch('http://localhost:8081/api/v1/grades/'+id, {
            method: 'DELETE',
        })
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                setErrorInfo(error);
                setLoadingInfo(false);
                return;
            });
    }

    const fetchInfo = async (id) => {
        setLoadingInfo(true);
        fetch('http://localhost:8081/api/v1/grades/'+id, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(jsonData => {
                setSelectedData(jsonData);
                setLoadingInfo(false);
                return;
            })
            .catch(error => {
                setErrorInfo(error);
                setLoadingInfo(false);
                return;
            });
    }

    const handleSearch = (keyword) => {
        setSearchKey(keyword);
        if(!keyword || keyword === "") {
            setFilteredSearch(data)
        } else {
            setFilteredSearch(data.filter(
                item => (String(item.score.toFixed(2)).toUpperCase().includes(keyword.toUpperCase()) || item.studentName.toUpperCase().includes(keyword.toUpperCase()))
            ));
        }
    }

    const handleSort = () => {
        const newIdx = (sortIdx + 1) % sorts.length;
        setSortIdx(newIdx);

        fetchData(sorts[newIdx]);
    };
    
    const fetchData = async (sort) => {
        let url = 'http://localhost:8081/api/v1/grades/all'
        if(sort.value !== "default") {
            url = url + '?sort=' + sort.value;
        }

        setLoadingAll(true);
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(jsonData => {
                setData(jsonData);
                if(searchKey !== '') {
                    setFilteredSearch(jsonData.filter(
                        item => (String(item.score.toFixed(2)).toUpperCase().includes(searchKey.toUpperCase()) || item.studentName.toUpperCase().includes(searchKey.toUpperCase()))
                    ));
                } else {
                    setFilteredSearch(jsonData);
                }
                setLoadingAll(false);
                return;
            })
            .catch(error => {
                setErrorAll(error);
                setLoadingAll(false);
                return;
            });
    }

    useEffect(() => {
        fetchData(sorts[0]);
    }, []);

    return (
        <div>
            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Grade Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="d-flex justify-content-center align-items-center">
                        <div>
                            {loadingInfo && (
                                <Loading />
                            )}
                            {!loadingInfo && selectedData && (
                                <>
                                    <p>Record ID: {selectedData.id}</p>
                                    <p>Student Name: {selectedData.studentName}</p>
                                    <p>Grade: {selectedData.score.toFixed(2)}</p>
                                </>
                            )}
                        </div>
                    </Container>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center align-items-center">
                    <Button variant="danger" onClick={() => {deleteInfo(selectedData.id)}}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            
            {!loadingAll && errorAll && (<div>{ errorAll }</div>)}
            {loadingAll && (<Loading />)}
            {!loadingAll && data && filteredGrades && (
                <>
                    <div className='filter-area'>
                        <input type="text" value={searchKey} onChange={(e) => handleSearch(e.target.value)} placeholder='search...' style={{textAlign: "center"}} />
                        &nbsp;
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                        >
                            <div>
                                <button onClick={handleSort} className="sort-btn">
                                    {sorts[sortIdx].msg}
                                </button>
                            </div>
                        </OverlayTrigger>
                    </div>
                    {filteredGrades.map(grade => (
                        <div className="grade-preview" key={grade.id} onClick={() => handleInfo(grade.id)}>
                            <p>
                                <b>{ grade.studentName }</b>
                                &nbsp;&nbsp;&nbsp;
                                { grade.score.toFixed(2) }/100
                            </p>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
 
export default GradeList;