import { getcourse } from "../courseservice";

export const getSingleCourse=courseId=>
{
    return async dispatch =>
    {
        const {data} =await(getcourse);
        await dispatch({type:"GEt_COURSE",payload:data.course});
    };
};