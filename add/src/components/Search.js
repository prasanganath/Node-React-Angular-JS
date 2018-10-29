import React,{Component} from 'react';
import axios from 'axios';

class Search extends Component{

    getKey(e){
        e.preventDefault();
        const keyTyped = this.refs.inputword.value;
            axios.post('http://localhost:3001/getLocations', {
                city: keyTyped,

            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

    }


    render(){

        return(
            <form className="form-horizontal">
                <fieldset>
                    <legend>Search Nearby Places</legend>
                    <div className="col-md-10">

                        <div className="form-group">
                            <label htmlFor="InputEmail1" className="col-lg-2 control-label">Place</label>
                            <div className="col-lg-10">
                                <input type="text" className="form-control" id="inputEmail1" placeholder="Search here" ref="inputword"/>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary" onClick={this.getKey.bind(this)}>Search</button>
                    </div>
                </fieldset>
            </form>
        )

    }

}

export default Search;
