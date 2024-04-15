import * as React from 'react';
import { request } from '../helpers/axios_helper';
import Board from "./board/Board";

export default class AuthContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    };

    componentDidMount() {
        request(
            "GET",
            "/messages",
            {}).then(
            (response) => {
                this.setState({data: response.data});
            });
    };

    render() {
        return (
            <div className="container">
                <hr/>
                <div className="row justify-content-md-center">
                    <div className="col-lg-8">
                        <div className="card" style={{width: "100%"}}>
                            <div className="card-body">
                                <h5 className="card-title">로그인 성공, Backend response</h5>
                                <p className="card-text">Content:</p>
                                <ul>
                                    {this.state.data && this.state.data
                                        .map((line, index) =>
                                            <li key={index}>{line}</li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col-lg-8">
                        <div className="card" style={{width: "100%"}}>
                            <div className="card-body">
                                <Board></Board>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        );
    };
}
