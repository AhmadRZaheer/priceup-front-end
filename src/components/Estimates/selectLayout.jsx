import { useEffect } from 'react';

import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { EstimateCategory } from '@/utilities/constants';

import { CustomCategoryLayouts } from './Customs/categoryLayouts';
import { MirrorLayouts } from './Mirrors/layouts';
import { ShowerLayouts } from './Showers/layouts';
import { WineCallerLayouts } from './WineCellar/layouts';

export const SelectLayout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const estimateCategory = searchParams.get("category");
  const projectId = searchParams.get("projectId");
  useEffect(() => {
    if (
      estimateCategory === "" &&
      ![
        EstimateCategory.SHOWERS,
        EstimateCategory.MIRRORS,
        EstimateCategory.WINECELLARS,
      ].includes(estimateCategory)
    ) {
      navigate(`/projects/${projectId}`);
    }
  }, []);

  return (
    <>
      {estimateCategory === EstimateCategory.SHOWERS ? (
        <ShowerLayouts />
      ) : estimateCategory === EstimateCategory.MIRRORS ? (
        <MirrorLayouts />
      ) : estimateCategory === EstimateCategory.WINECELLARS ? (
        <WineCallerLayouts />
      ) : (
        <CustomCategoryLayouts />
      )}
    </>
  );
};
