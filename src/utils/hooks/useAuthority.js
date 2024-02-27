import { useMemo } from 'react'
import isEmpty from 'lodash/isEmpty'

function useAuthority(userAuthority = [], authority = [], emptyCheck = false) {

    const roleMatched = useMemo(() => {
        return authority.some((role) => userAuthority[0] === role)
    }, [authority, userAuthority])

    if (
        isEmpty(authority) ||
        isEmpty(userAuthority) ||
        typeof authority === 'undefined'
    ) {
        return !emptyCheck
    }

    return roleMatched
}

export default useAuthority
