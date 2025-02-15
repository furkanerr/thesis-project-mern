import './modal.css'
import React, { useContext, useRef, useState } from 'react';
import { Modal } from '@material-ui/core';
import { AuthContext } from "../../context/AuthContext";
import { PermMedia } from "@material-ui/icons"
import ThesisService from '../../services/ThesisService';




export default function SimpleModal() {

    const { user } = useContext(AuthContext);
    // const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const name = useRef();
    const writer = useRef();
    const desc = useRef();
    const point = useRef();
    const [bookFile, setBookFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newBook = {
            userId: user._id,
            name: name.current.value,
            writer: writer.current.value,
            desc: desc.current.value,
            point: point.current.value
        };
        if (bookFile) {
            const data = new FormData();
            const fileName = Date.now() + bookFile.name;
            data.append("name", fileName);
            data.append("file", bookFile);
            newBook.img = fileName;
            try {
                await ThesisService.UploadService(data);
            } catch (err) { }
        }
        try {
            await ThesisService.AddBook(newBook);
            window.location.reload();
        } catch (err) { }
    };

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div className="backgroundModal">
            <div className="container">
                <div className="screen">
                    <div className="screen-header">
                        <div className="screen-header-left">
                            <div className="screen-header-button red" onClick={handleClose}></div>
                            <div className="screen-header-button maximize"></div>
                            <div className="screen-header-button minimize"></div>
                        </div>
                        <div className="screen-header-right">
                            <div className="screen-header-ellipsis"></div>
                            <div className="screen-header-ellipsis"></div>
                            <div className="screen-header-ellipsis"></div>
                        </div>
                    </div>
                    <div className="screen-body">
                        <div className="screen-body-item left">
                            <div className="app-title">
                                <span>BIR KITAP</span>
                                <span>EKLE</span>
                            </div>
                            {/* <div className="app-contact">CONTACT INFO : +62 81 314 928 595</div> */}
                        </div>
                        <div className="screen-body-item">
                            <div className="app-form">
                                <div className="app-form-group">
                                    <input
                                        className="app-form-control"
                                        placeholder="Kitap Adı"
                                        ref={name}
                                        required
                                    />
                                </div>
                                <div className="app-form-group">
                                    <input
                                        className="app-form-control"
                                        placeholder="Yazar Adı"
                                        ref={writer}
                                    />
                                </div>
                                {/* <div className="app-form-group">
                                    <input className="app-form-control" placeholder="CONTACT NO" />
                                </div> */}
                                <div className="app-form-group message">
                                    <textarea
                                        className="app-form-control"
                                        placeholder="Kitap İncelemesi"
                                        ref={desc}
                                    />
                                </div>
                                <div className="app-form-group message">
                                    <input
                                        type="number"
                                        min="1"
                                        max="100"
                                        className="app-form-control"
                                        placeholder="Puan"
                                        ref={point}
                                    />
                                </div>

                                <div className="app-form-group buttons">
                                    <form onSubmit={submitHandler}>
                                        <div className="shareOptions">
                                            <label htmlFor="file" className="shareOption">
                                                <PermMedia htmlColor="tomato" className="shareIcon" />
                                                <span className="shareOptionText">Foto Ekle </span>
                                                <input
                                                    style={{ display: "none" }}
                                                    type="file"
                                                    id="file"
                                                    accept=".png,.jpeg,.jpg"
                                                    onChange={(e) => setBookFile(e.target.files[0])}
                                                />
                                            </label>
                                        </div>
                                        <button className="app-form-button" type="submit">EKLE</button>
                                        <button className="app-form-button" onClick={handleClose}>KAPAT</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

    return (
        <div>
            <button type="button" className="sidebarAddButton" onClick={handleOpen}>
                <div className="modalContent" style={{ wordWrap: 'break-word' }}>Kitap Ekle</div>
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}