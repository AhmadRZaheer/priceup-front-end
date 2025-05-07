import { useEffect } from 'react';

import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { EstimateCategory } from '@/utilities/constants';

import { CustomsDimensions } from './Customs/dimensions';
import { MirrorDimensions } from './Mirrors/dimensions';
import { ShowerDimensions } from './Showers/dimensions';
import { WineCellarDimensions } from './WineCellar/dimensions';

export const SetDimensions = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const estimateCategory = searchParams.get("category");
  const projectId = searchParams.get("projectId");
  const layoutId = searchParams.get("layoutId");
  useEffect(() => {
    if (
      estimateCategory === "" &&
      ![
        EstimateCategory.SHOWERS,
        EstimateCategory.MIRRORS,
        EstimateCategory.WINECELLARS,
        EstimateCategory.CUSTOMS,
      ].includes(estimateCategory)
    ) {
      navigate(`/projects/${projectId}?category=${estimateCategory}`);
    }
  }, []);
  // const estimateCategory = useSelector(getEstimateCategory);
  return (
    <>
      {estimateCategory === EstimateCategory.SHOWERS && layoutId !== 'null' ? (
        <ShowerDimensions />
      ) : estimateCategory === EstimateCategory.MIRRORS ? (
        <MirrorDimensions />
      ) : estimateCategory === EstimateCategory.WINECELLARS &&
        layoutId !== 'null' ? (
        <WineCellarDimensions />
      ) : (
        <CustomsDimensions />
      )}
    </>
  );
};
