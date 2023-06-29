import React, { useContext, useRef, useEffect, useState } from 'react'
import M from 'materialize-css'

const SearchUserComponent = () => {

    const searchModal = useRef(null)
    const [search, setSearch] = useState('')

    useEffect(() => {
        M.Modal.init(searchModal.current)
    }, [])

    return (
        <>
            <div id="modal1" className="modal" ref={searchModal}>
                <div className="modal-content">
                    <h4>Modal Header</h4>
                    <p>A bunch of text</p>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>
        </>
    )
}

export default SearchUserComponent;