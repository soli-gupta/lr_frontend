import axios from 'axios';
import { useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

function FeatureSpecification({ featureCategory, Url, productId }) {
    // console.log('productId : ', productId);
    const [allFeatures, setAllFeatures] = useState([]);
    const [tinyLoader, setTinyLoader] = useState(false);

    const fetchFeaturesBycategory = async (_id) => {
        // setTinyLoader(true);

      

        await axios.get(`${Url}get-all-features-by-categories/${_id}?product_id=${productId}`).then((res) => {
            if (res && res.data.status === 1) {
                setAllFeatures(res.data.features);
            }
        }).catch((err) => {
            if (err && err.response.data.status === 0) {
                // alert(`${err.response.data.message}`);
            } else if (err && err.response.data.status === 2) {
                // alert(`${err.response.data.message}`);
            }
        })
    }

    return (
        <>
            <div className="col-md-6">
                <div className="featSpecCont">
                    <h2>Features & Specifications</h2>

            
                    <div className='custom-scroller'
                    >

                        <Accordion allowZeroExpanded>



                            {
                                featureCategory.map((category, i) => {
                                
                                    return (
                                        <>
                                            <AccordionItem>
                                                <AccordionItemHeading className="accordion-item" key={category.cate_id} onClick={(e) => fetchFeaturesBycategory(category.cate_id)}>
                                                    <AccordionItemButton className='acrd-title'>
                                                        {category.cate_name} 
                                                   

                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                {
                                                    allFeatures !== undefined && allFeatures !== '' && allFeatures.map((featu) => {
                                                        return (

                                                            <AccordionItemPanel  key={featu._id}>
                                                            
                                                                <table className="table table-striped">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>{featu.fs_id.feature_name}</td>
                                                                            <td>{featu.fs_value}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </AccordionItemPanel>
                                                        )
                                                    })
                                                }

                                            </AccordionItem>


                                        </>
                                    )
                                })
                            }


                        </Accordion>


                        

                    </div>



                </div>
            </div>
        </>
    )
}

export default FeatureSpecification;