
import { DriverForm } from '../DriverForm';

export const CreateDriver = () => {

    const callback = ()=>{
        //poseDriver
    }
     return (
       <DriverForm
         disable={true}
         callback={callback}
         buttonText="Create"
       />
     );
}