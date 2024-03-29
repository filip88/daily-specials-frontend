import axios from 'axios';
import { BACKEND_API } from '../../util/consts';
import { loadingStatus } from '../actions/feed.actions';
import { getMeals } from '../actions/feed.actions';
import { endOfResults } from '../actions/feed.actions';

export function getMealsAPI(currentAddress, range, tagsArray, delivery, scrollCount) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let tags = tagsArray;
            if(tags && tags.length === 0){
                tags = null;
            }
            let response = await axios.get(
            `${BACKEND_API}/user/feed?scrollCount=${scrollCount}&lat=${currentAddress.lat}&lon=${currentAddress.lon}&`+
            `range=${range}&tags=${tags}&delivery=${delivery}`,
            {headers:{'Authorization':`Basic ${localStorage.getItem("ACCESS_TOKEN")}`}});
            if(response.data.length){
                dispatch(getMeals({meals: response.data}));
            }else{
                dispatch(endOfResults("End of results"));
            }
            
        }catch(err){
            if(err.response.status === 401){
                alert("UNAUTHORIZED");
            }
            console.log(err);
        }
    };
};