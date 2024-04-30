import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleMenu } from '../utils/appSlice'
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import { debouncingFunction } from '../utils/helpers';
import { YOUTUBE_SEARCH_FILTER_API } from '../utils/constants';
import { setVideos } from '../utils/videoSlice';
import { useSearchToggle } from '../utils/customHooks/useSearchToggle';
import { current } from '@reduxjs/toolkit';

const Head = () => {
    // const [searchState, setSearchState] = useState();
    const [suggestion, setSuggestion] = useState([]);
    const searchRef = useRef(null);
    const { open, setOpen } = useSearchToggle(searchRef);

    const dispatch = useDispatch()

    const handleToggleMenu = () => {
        dispatch(toggleMenu())
    }

    // useEffect(() => {

    //     const clearTimer = setTimeout(() => fetchSearchSuggestions, 2000)

    //     return () => {
    //         clearTimeout(clearTimer)
    //     }

    // }, [searchState])

    const fetchSearchSuggestions = async (e) => {
        const data = await fetch(YOUTUBE_SEARCH_API + e);
        // const data = await fetch(YOUTUBE_SEARCH_API + searchState);
        const JsonData = await data.json();
        setSuggestion(JsonData[1]);
    }

    const searchVedios = async (item) => {
        const data = await fetch(YOUTUBE_SEARCH_FILTER_API + item);
        const jsonData = await data.json();
        dispatch(setVideos(jsonData?.items))
    }

    const ResultedSuggestions = debouncingFunction(fetchSearchSuggestions, 400);

    return (
        <div className='grid grid-flow-col p-5 m-2 shadow-lg'>
            <div className='flex col-span-1'>
                <img alt='menu' className='h-8' onClick={() => handleToggleMenu()}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzNUE_eco4btlNCPYduL37a2pES9OVZeVFjg&usqp=CAU" />
                <a href="/">
                    <img alt='youtubeLogo' className='h-8 mx-2'
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAa8AAAB1CAMAAADOZ57OAAAA8FBMVEX+AAD+/v7t7e0nJyf////s7Ozu7u76+vr39/fy8vLx8fEcHBz19fUlJSUiIiIbGxsXFxdNTU3Z2dlFRUXQ0NArKyuAgIDIyMiXl5ePj4/e3t7kHh+JiYn+2tnm5uY5OTlqampzc3PrAACmpqZAQEC9vb2ysrLpAAD2AAChoaGUlJRmZmbLy8sxMTFTU1P/zcz/8PBcXFz84uLsFxYAAAD7iInuq6v/w8TzeHfhR0bfOzz0iIj7rq7/uLj5oaH/4+PnLi7xWlr5pKTvZ2jhRUPxcXHiJiblWln4lpTjOzrvHyDvUVDiEQ39g4LrOzn4xMV/i8AgAAAaBUlEQVR4nO2diV/ayhPATdhsSALhEAFRUESgKArY159tPVt72NbW//+/+e2R7M4mG46A4utz3udd2yHHfrPXzOzsBhLimJiLmRVlhigzdYq5uCI2DVGYW1zRma6Y1SgiqWjPUDSnKbpSES+jaIsyLBVdTeUurojxBjICIZqBWFlRaFui0BCKjijLCUVDq2jNqZgTis6ciqZURFLRFmVZUehKRTOuaGgV8VRFrFPMCkVbp+hOVTTnVnxhvMzn5qVXfFJemsrV89IovrT29crrldcrr1deccVXXq+8NFd85fWX8jIBhqm8oOJUXkBxOq8Zin8Br/kVN8BKzQoFrJdFmSUVHVGW0ykaiyvmRBlY3aZQBKtbUeamUDSnKoLVLdYo2tMVsxpFYIzQUQCKG47rcHGzdihZUeaIMvuFKdqizJVluWmKjkbR1Si6cUXyDzcHFF1eFlNkf6uKbvTWWVEWvWJc0YkpboA+Imx/so+w9J2JRhH2EdbCiqLpI9H0LdinT1M0rRSKmp4aPa2JBk1TRDpFLYUNTVf9L+v85x6sIS9RNmvKNK/iUiY1oKirXOeV1ysvDYZXXqvh9dof/rt4pW1feDW8kMEG1VdeT8pL1s+q2td0V88rr4V4WVEMYZGGFwaK6L/OK41JbYHxa9pS3jSVNb+4pFx4C0c1UHRDJzf0kdMf0ws+wZrfSqH4PCaa5Ww5WsvLRjZRcrlsLlJEV91ExlLOiDTPHx8fR6PR+fmIyuP5iJaOoWS5GSF2C36f6G1eJVES7Yecs4ExYXJz0xydj86vLi8vP9/fX7x///XuA5UvX758JHK7Q+Xh4aH/8yf5987Otx+klPwh1fl+9/X9+98X99fkx1dXo2Zz1Ly5ITBJAww+whV+nGu0H8YatPk09kNN5x9E5tjjm9HV5/vfhM3HP9923vYPiLwJZGNuCX/xhvy6/3bn2+3HLx++v7+4vrxqjm1CYunO/2Xa5zFURE/qTzHJ0Dp+vP764c8DAzQ/mwUgHhw83H65uz8/4+3r7+Plui7oA56UV/bm+sPDk3CKYet/vGjafyEvXB4Q6QRiQcVV88Jnn38cPD0rwez2/iwnHlzvr4wbtyGvuTEszssELgZRNhev7j+ekH8qT8ErWGrg5tf+89GicvDpfKzhJYNaaZcZ4YXl9Bqx8ONV8IJXDAQsSWThXLy8jJBi+en6Qzz68IyNi8ub28sQGGg23Woou7u7FaTwwmVaGEi1sxJeTkNcswpvHSncbmk7ziiv2lPzMtwA1zOMWzFg366CNgJ49WCPcqTwwrhXBH9Yd1fBKzcEN0yUwl75ZfCikfameXP37K2LAfsx4g8JeDW25Bt7bYPaiUX7crdhdQxF+5KjjbDG6EygWkVnWMzMlvxhYx4XeZTXVF+6Obcv3dwwwsgAwyEz0PH9M49dAtjdmUslJ5/H3ffFG/sly7DJX1mXi3ks/yy/Zwalrh3+WiiSSTW4ojtNMVubi9dmw1HrLPi1ekVH4VVBiYpcpl/RlooR+2Hz23pwbWz0r2Jr/g6ov60hhmt+6zAv/qiwO6dxYIb9EHXn4eVvWnNZXiqQVw2vzH4Y9sAW7dPtd2vpDZl8GCO1q0Zl8Mp+xwV9BKqAvrLYFR3Hcvb5uXmJ3inZnxLjFVdU5sKypxaKs/0p6OZ2bbg2+udI6arJKAEakVd1IK8OqI28tRpeC7SvlfNK5f9C6POaRi8qb96rtYsR2i3Iajq2IK+qrA1/IuviGXjl18ArIX4D2e/XMJcX8oN2iAovUIH5vTKWGJxTOd0o1Ffkr/zXtS/j7OMacW08NANeOORlwYqquQIDap2ACuyujldeitqopPiHL4YXau6sk1f/kvIKH4cF5oBm5NUBr64sz+xZK+Jl1DZLgZyenu5BXmEhkdKx+WJ4Xa1x+CID2IWB1PkGGsgeym8DXkdg+GrPHegxi5eMeCAadTg5LdNKEz+ex3PwHOOXcbG+2TyVr3aUVwVMOE5bWGAAK+lCx10VLwsmkKjLW2e8MkxJMVd81By89IFUGl7Q6CPWy1RzrdONjY1f46iP3Aa90kkFh8tga08OL1uVGc70hbZEmWLRqvIyF463ear1Mvjmzj6tl9fOCKtrSKyYpGoocEK5NdBVnQIzrtZbpbP3TldEBlYNlF4LJVxR5yiz+TMm2HvNrKoY9iWxLkKvCHk1/6wV18bDOY706W5HfuXedmjvdcHY4tXRAv5la05FLS+tfzlunV3WPp90RS6Q12htxkMu/Usc6dMxsDv5bRQEejhtpdU9STxAjNei8QBP709xHtc6nSe87mO8cEmMVH4Jc164VRK88ofuf5fX5cN6eR28i/aHprsLXrsc8FIb3dPkj1qYFxi/ZvBSwS7B63rx5ddKo93efB1H57guCIPwupyX2wOz+R5SdmKIeZQtanL6fCM9L6TwErMDNKV90bh11+BrAj0v8oY0EM4lingmrxTOlJ8XX1a4Zrsb0+x3kBduSBu9Vw14yTaXPylLXqQ2rEatc7S9vX3U6VYaLg8xgBhCrx82wtvQNHlBmYPCmkzkRes7VKS6nBctxZG9Ahpe2G1VOru7u/Vug38uUV7kt7jRHWxT6XTLZsg1iVeK5ddO8+b+dmVN7NMZ7Q/Dp2Sv7U5EY/KP+fwQS9+yf2qHvEhtdKunJ36Bi39yultruZAXahGQXLbr9V5g6c+2jsLSwaDemd6+WoNtrjiok79svhcH09Lt+oBJvZ5L4OW2OpMTn0aAeCftmoFivFCuWy0xDSqZvclR2Yg2RIXX1zS8kD16/3ZFxL40YzYadyAb06HFeDXkapnO8TkvbHUneQ+YFTN+IbNfMzHgNfynIKJmivshr7IflhYKxUN7Gi/c2CwWmCKVEyfYO8VKC6FYel64O5GP5/nbNlJ5Ibs78QvKCxS3qg0U4yVkfJeKFzLG598PVkLsR5P1h9CKgOHauEKNA7imzuaZcQC3qnn4rkG1bA0sEFZYAf4StjpgvVcZuKrzJd6tmVaUFzM3mI0SNDTn+DYGtTRjMRNNLP6ws6U8X3HXVm05btWLv0Bxr8Z7WKG44QgZf0/Fi34A49VEBN827ax8Hh5sAlxd3oBuSzLkGjp/2MgxRcPaL8RelioUtrO2uGAN6Pj7wZ2yLchrEwe3No6gPapBymjSEkvhZeX4M5qnsKYbfOvUUAngynZ81UOTKfYckAYl15ponW/+VjfnONp8KeY4hTkq4GUYNxc7yzexh2YsXwoCrmR/H1OzYBWMaNSHaZEPsK3FlaHmYHFF3FV4MZOvZUV4WfTOGvshMwwjrPBqYZbdBDkKr3Iubu8d9jIRXBn/sCznVigBF1E7GWJ9vhTz7NfiNRzyIlU2+tpfllh/pNrn2ZVlx5IvtQgv41QOXwM2TUbQ7xKR/EkYnKjlZWp4Bf4U1T6fxMuI8WrEeXndkqavGwBX6XbiC3jHLb3/y7z5sQwvMv5d/VqyU9TyktOL/FaF8AL1u1VjT48a+ejXC9530sLr5pU51TyfX5JxQo04TiHFHtbyws3b9LzYtYzx9XJz+4dHDS9DTt+9LpkOSJ8Yc4lRXlVYN3S6B6vH67lr50X/PK8+FimoCV67cCZU8P0C0PT3rQReKcy9kBet25t3D0sQ659rfAyg5rwjwktGkXpVvlxtwc7En/S69T1Qgf6xhdfNi9zPK1Wrm0pZcRC+IXwE77RbqfSAJulVEnilMPeqvKgxZnSXfhjrX8XbF3lzOb+YEF5t0NxYy3Hh6OVVTcd1ypvgAw16zbXy8k+61NakDFNe2w7Gkh4Iezhm1pPWJvSg57S8RsvzojcfX31JGwbSv9TxkpPo/Cb50oTFPn9YZg9vgeryS6yLdGFoWuHIXTcv0kboXBDZIOyf3Cyc90kbTsYbsl/D2Dp/Xzs/XA2vYBhLN/Hof9bxQm356mXUkg6WY64Hl8GFcGsRaGA+mWGtmVehhwIMcN1xwq0XyJLReX4pWMa0tsQL5E9B4ImM31gVL0qsmW4YO7hW1/wGN3b0xKsXasBI4Q3YFggMt0VkuqxMMSfRUFNaZqq8XP7mMV76+A2TxW9EeLHskii+/qKFkBf5YthCDRE0cCZRY40OtqVw3xSyZZvLn9DGGcy+NnKhZM/frogXvd1jmmHs4J5lTwkfKBC7LL6/wgBuWhky5SyYHeY3W/wC2R7c21LjinC/kL8f3CnbUHi5wa1t1b7BH8duqfaNIJ+MYvXItPhDK/aNXvguDghIyRQ7LIGMDcZfbzvMKQN96EOZaAbYD1O4vxJ4sU7x8tfC1zu4MDX5UsyW+NZILYsX9k8DBwgYE9iEhEkZVDftjRa1H2Kd/RAvYT8MOjHofyWdNysFxpniIIzcAl8hmVdJ+6HsGq9TDDpJvCixs/tFh7GDd9oYSunwypccsfT0qlzVPQS89gNHJLJAFRaCzbQRXlwxq/DanGGfj/Ey1fgEzstM9C+7SrPddfnPZR9Z7Ia7/mGj6winM34yXrRTbP5ebBhL4iUt8ntlEZHodYORGU43dsNJSg7UoNfmo/0L4IUHkFeVrgxx6xC8QMjLBf2+d6Tldb88L3XxbKDx4/dFhrEEXmZLOJm3RCxAfi+YXZWVqbvgBXdEHNsvhhec83htplkGj+rVQl5wTVZ1nohXvI2Nf6+Aly1m9PlJSC7s+lBNmc5reZVYOPTL4AUvu08XGngIfuwPJS/xXH77GXjx8sWiBZJ4IeBkjqJB4MXo/FHDizqmXwov4Gyl9s/YslDwUhbMWl4rHr/YHPHjQtekvOTvwa4CWKfhS1QEL1mo50VWSi+Fl1uBvEoNqglfYC28UEBr4TCBhPZlGa6yIuXvGsSAofpMXvkpvAz7edtXBayX85sNPIWXeC7v6dsXMuzmu4XDcNj6S8cL7SrW0wwPbuNqyopmEEakObPbF9LyQgm8UCKv+PpLx4u/DS4DTc4LzgQpL2saL3ND1vHVyuwb1LGSJszt4N7NyYvApFvdKK9CL7xxhFdQqvSHgaFuqGtfan9Y4tG3LnZUXlQRY1fl5VBFUhptXyyfcTRfSpDmWLV+NWhmFYVXLcfTHzvQSLUfFJLfy3wpePRzRbxIV3iVKow0aj8MxcVlZXsqQxBkWDWhs9Kru8EWrhz8wVaN2SEi9kMr2X6IEvZ/aeyHSGc/RIn7v7DydbCEsUp/2A3fuQZ5yapYvX3eoD6wdPFtgX0+3G8u+Ltm61gdwPzjsIvAEV5BcYSXG5uIPad9Xu6vjPGKTJjy9eFwWKECFtbe/hP6U5DdvEgbP6r1fzFeih0nQ2fzxl/JK+MVA1HWaU/lXyYyvv6WOuommRfuKrjIbD6cjvxlvHSSxGvp+A3SFV79WCLUl8ZvJPAC+x7om+5Z9iuv2+V4kf8aLWQujPN6RLbYs6ru6bXacIboVY1XXjcpti8DXmQOf7FkxOiDJv4w4AV3MlMHIPpv8UJxXkvF97KBa2fZGHrKy8RaXrgCF1Rbrf8YL037Shs/z69Fg3uXDqCf0r5wA3j16K7lv5SXmB8SCXco/QN5yfyiS+x3WCrqUMq3ZuKZIorRh0aChYqx9bKVtF7G86+XF4i3WWq97EbXy/lqR8igHkoPrJfFdMFIuf/LWNHmFCJ/mlhvjyL/B02+NOexMOTPb4/S2nt19nlya3ceexRi9qiYvVdnjwoMSq4a3dOgRar9UCb11aa+B/becbr9lcb4858V7WGO7K8UW4uinQ7hJRRhUss0/pR57fMJ9l7LjJTOsM/PtveG40FCfmzJK93+5fH5p9VsrtwI9y8LXibgFW1fktf2crye2V8Z96e4Wn+Kms9B4FL2L/9evJnsXH5d1ebljSA/wKK8Ov8mfyWe1185T/6NFAEBb36uNv9GCl6z/cv5vRcaDzBpTeFlisQqKIHX5VrTVRJev9PwUrY2aONtyKzvxfDSxEcpCAUv3MLZcFKpPz/FOV93PqL7WD6iOXhBL2RRH882yb4YXj01/pB1kXD3V020r/bkuLp7NOh1u90W1vBCThqHyiqlf5mGVwO2r23BSz18xXgpvOrx+N4GWCqKeFFsTTyW+4Wsm//Rx/e+wPyHgdCnS+TVghtB2uHLwHhsj1N8Ml4LzOeVy/LNTwQ3KOqFvFogj4XCS1oRbn6tN7/ow8hkOVINdb8Dz5EaX38FkgNbEeV+h4Y6y4/vdwh97NnnyZfCoxdMC2w7yRQ67OfQd14YBGYXs3EIecn9DmL7jpNNs2Bepfy4sW2wnwhkEyECO538oQUU4VFFJSvYJdRVgiJ4obIla4KDt9bsJ3KydnQ/kUPL1HwpJy2mSEpn5EvZKg6D86dtS3HjDXkhiMjzdsN3boD9KT1xfJENzydad37s72OaUynMeRzJkZpoP4QGX5Ztgxa6cJwI9uth2JLoxlm9/dBMtB9GLLt+xZw3Xwq1H9JCVIb7YYNlobL3tW0HOzFBZ+CBExGUfObrndC/eRfNPy94mTpegZ5iHwiTN2C4Kew02A/bUGyKQR4Vu6NsKZ5un8/CsJ9iz+X2+SG8rs4+X+i4QRAtNMbQDWx8xgTyb24Ge1/h/f2anhcarXVC3782jBS8MNyaFyRvwJXYNCyycSfjD+jIjp3almIhms4LweGHppNgEx41+FjDK3/S5a2mDG9W2A0g2vAYi2CXlANy3u6VE3idrXWC+DBC6nk38/EyTWXTfcehUZkTWNQN3tGFaWbyh2XHda3OlhIXMp2XEcnMUqOTnpqaVUOfL2VrgAmxyiYkWwxDXpVjLE5ZlnwDZH7wJ2YCLzuFR2V1cnuTjpdi4M74u8Ny9xQ2uVIj5KXEgPh7u53dUlHJOTOTlxKVkM9Ue/VJ0c8oyby0+TfyxZPj6mlRaYgnYbNRDqbzNjvlcvdYMdoknv+VZkvRquTNVzsdL+wqueq8YkGpl6LwObuq5z3vFVnKwbxcr87kVVHw0nuxW+2BOYs+vw35PvxoyKvIWAG3YGd86lqGqif6/Db0fL11HlDEjidK1R8qW1Si4m82RERIQ5cWzD+VsY0zeeHYRhn6q70umKZrePmaH5HuUKStQdNOpi1U9fm+aPta5wrs9iw1r9ymrkKCuu65UnGi0St25Wlis3ipEzxRo4Ps6TRe/kRDmSwoBAYyj0nK38iyh+jOu+Hnw67P5Nu/Z2sZGL8heU1Zf1k0/+EwMaFecTcr31BNLxMobCMsWseM9RddQJ3E7uQdOzDPUJkrAl6FejeWrjJToGny+FyQmmP2Er64vN/DSn42kJ+ELJ/H79c0gr35eMbW71lnYfsGUTR6muy9jMa+ZUsLjp09jo4qxbZrO6LZCftGPF+KE1goYpklvVLDzoJm1+C2DGDfKA7teiSXXqZYJXeys+EbZisn2hfw/R57Q6EI7YfU7DX6uJ4e8eGKGSaSz1iK2g9dqEimEoeaHsUvVFtYKBrIwpXNyLStjbHpiln6DPshraDGsQqseFpxlSkqsx/CjeX5rRYy6hmFR3HfiZyd1YjMHvnjlWL5ltVRwsRXqwl1WlD612M+xCT5U5BbKviheHsNmCOVxry45epWQZkn+l5h0rOwer6DWzmVOcP9wsnAJuOge1QMLwzs80VxO78IznfAjbas2LyXrzZc5iMWzxbY57uipHhMPgKXrDHE4/nFqoPU/PMI4cFhEb5A3i/u1S0UGdShP4UVjC+fH9ib/v2ZOZ2XkdttU9lnUm1FeJmkmVSOJieFYpGnly/4pXa35eLIeRwYN+olr1CgKl5pu4FY2FOXX5VcvmqEvDqijNwUS14mbnUmfpFdobjXrnF7SrktxOW8KvLXHdK0XdzoHJ9wh1bmuGurGEw25LU6+3tUgz2/d7jfa8UO7ojzwuOrleQmXwTXt+txOE1N5MXLc4FbAkd50SfHrfKwN6i2q+3tTrdGuszoeRxcrdElOu3d3pBlgGPHbPCuTtyGubWCcFIjLBXnp2A3V+ltE7adWsvEweZCC0RbBCXBFdnP6RYb3Kp0B0fbg26Z23Rj5zuQjq9V6dW329WjQa/G4k6NKbzCeS8erTLmaTat/vcR7wytabz4PCpr8gMmzTgvKkb4iizEkpfFzrvBrktrl6vyg4zYNV1RP9wNyQr5eGYY6nk3wW+Rcr5eOEza4ffDFbkq80zSc1aYYhRDOBem4zTGFtXE5qz4KOnEHD/e7awsqHA6rIO3ny7HKGfNbF/8GXWHq6rnSYVuY2muivIyldOfEs4nAlcMZLHzv6KKT3CelFxX5pDd/Hz3Z6d/cLDSA6MgqDcHB/2ffz7dP45pYltx66V5TcNgzqv4pLw0GJbgZTFe1BM1bl5d3t/9+vHndufn2wMmb5ikoUOFX6P/c+f2z49fd++u/zc6G3M/3n+Kl0ZRx2t2fyji1bOIjxZkGBifnZ01R+dXn68/f774/f4r4ffjD5XbbztEfhJ5y6Tf5zT4/9Hyn1ThlilTPnfvf19cf7783+X544hcdDzGYec180xiDS9rXl7Wkrw0Haeel1Cct32hFO0L5ktxxCYI8AmwTRVkmByzlkAtIGOKkEBsNkejEf2byeP/AiE0uAQKTJnQoYtzdrQXHXS5yFvnzPDWiftTAkVR5kxXzC6u6KZQdEVhdnFFsO1kbsWI/TCIGRJlwIogEJu6jS7ALiHuaEbOnGNfDUbixChsiVkzUARrfmh5SVa0pisudF72oorTj8GeW3GB87Ln7iOEHnW8TFPEPOMJ4yW+ObE5SH94saFZaqx8sJ55Hr0oNKSiNaeitks3pymaWkUdhST/l6hd8fNZh6vqFKdfcdZgrVPUYhCKs3jJB5/BS1e7cyuKKdNMXqJwFi9d5W5gTe+VDYcTaFXF5hKKtijDoPcShdllFEHH6UxTxDMUDaloaBRz0xVziyuC/lCnmNUp/h+7Rd+79e/y8wAAAABJRU5ErkJggg=="
                    />
                </a>

            </div>
            <div className='col-span-10 px-10' ref={searchRef}>
                <div className='flex'>
                    <input className='w-1/2 border border-gray-400 p-2 px-5 rounded-l-full' type="text"
                        onChange={(e) => ResultedSuggestions(e.target.value)}
                    // onBlur={() => setSearchActive(false)}
                    //  onFocus={() => setSearchActive(true)}
                    // onChange={(e) => setSearchState(e.target.value)}
                    />

                    <button className='border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100' >
                        <img
                            alt="searchLogo"
                            src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-10.png"
                            className='w-5' />
                    </button>
                </div>
                <div className='w-[32rem] absolute bg-white mx-2 rounded-b-xl shadow-lg'>
                    <ul>
                        {
                            open &&
                            suggestion?.map((item, index) => (
                                <li className='px-5 py-2 shadow-sm hover:bg-gray-200 flex items-center' key={item}
                                    onClick={
                                        () => {
                                            searchVedios(item);
                                            setOpen(false);
                                        }
                                    }>
                                    <img
                                        alt="searchLogo"
                                        src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-10.png"
                                        className='h-5' />
                                    <p className='px-2' >{item}</p>
                                </li>
                            ))}


                    </ul>
                </div>
            </div>
            <div className='col-span-1'>
                <img
                    alt='user logo' className='h-8'
                    src='data:image/png;base64,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'
                />
            </div>
        </div>
    )
}

export default Head