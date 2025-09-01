export const getLogDetails = (log, userData) => {
  if (log.created_user_id === userData.id && (log.type === 'Canceled' || log.type === 'canceled')) {
    return 'Task Canceled by You'
  }
  if (log.created_user_id === userData.id && (log.type === 'Declined' || log.type === 'declined')) {
    return 'Task Declined by You'
  }
  if (log.created_user_id === userData.id && (log.type === 'Approved' || log.type === 'approved')) {
    return 'Task Approved by You'
  }
  if (
    log.created_user_id === userData.id &&
    (log.type === 'For Review' || log.type === 'for review')
  ) {
    return 'Content Submitted by You'
  }
  if (
    log.created_user_id === userData.id &&
    (log.type === 'For Revision' || log.type === 'for revision')
  ) {
    return 'Requested Revision by You'
  }
  if (log.created_user_id === userData.id && (log.type === 'accepted' || log.type === 'Accepted')) {
    return 'Task Accepted by You'
  }
  if (log.created_user_id === userData.id && (log.type === 'edited' || log.type === 'Edited')) {
    return 'Task Edited by You'
  }
  if (log.created_user_id === userData.id && (log.type === 'created' || log.type === 'Created')) {
    return 'Task Created by You'
  }
  return log.details
}

export const getSvgType = (type) => {
  if (type === 'Created') {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-5 -5 24 24">
              <g id="icon_task" transform="translate(-44 -26.51)">
                <path id="Exclusion_1" data-name="Exclusion 1" d="M5.59,15a.453.453,0,0,1-.206-.051.479.479,0,0,1-.16-.135.464.464,0,0,1-.086-.4c0-.007.586-2.388.59-2.4L8.075,14.39l-2.377.6A.44.44,0,0,1,5.59,15Zm3.283-1.132h0L6.244,11.209l4.6-4.648L13.47,9.219l-4.6,4.649Zm-4.493-.263H1.393a1.37,1.37,0,0,1-.984-.414,1.435,1.435,0,0,1-.3-.447A1.419,1.419,0,0,1,0,12.2V4.7H11.417l-.064.049h0a1.764,1.764,0,0,0-.18.152L5.257,10.877a1.488,1.488,0,0,0-.366.656ZM2.322,9.861a.464.464,0,0,0-.33.137.478.478,0,0,0,0,.667l.465.471a.479.479,0,0,0,.334.133.45.45,0,0,0,.324-.133l.929-.94a.475.475,0,0,0,0-.666.464.464,0,0,0-.659,0l-.6.611L2.651,10A.463.463,0,0,0,2.322,9.861Zm0-3.287a.464.464,0,0,0-.466.47.472.472,0,0,0,.136.334l.465.468a.482.482,0,0,0,.334.132.445.445,0,0,0,.324-.132s.914-.922.929-.939a.476.476,0,0,0,0-.667.467.467,0,0,0-.659,0l-.6.612-.135-.142A.465.465,0,0,0,2.322,6.574Zm3.252,0a.47.47,0,0,0,0,.939H7.432a.47.47,0,0,0,0-.939Zm6.968,7.03h-2.1l3.49-3.527V12.2a1.406,1.406,0,0,1-.411.994,1.373,1.373,0,0,1-.983.414Zm1.588-5.053h0L11.5,5.895l.324-.33a1.309,1.309,0,0,1,.457-.3,1.464,1.464,0,0,1,1.06,0,1.323,1.323,0,0,1,.457.3l.655.663a1.379,1.379,0,0,1,.3.466,1.43,1.43,0,0,1,0,1.063,1.386,1.386,0,0,1-.3.466l-.326.328Zm-.194-4.795H0V2.334a1.4,1.4,0,0,1,.409-.994,1.382,1.382,0,0,1,.442-.3A1.366,1.366,0,0,1,1.393.925h.465V.468A.468.468,0,0,1,1.995.137a.46.46,0,0,1,.655,0,.471.471,0,0,1,.137.331v1.4a.439.439,0,0,0,.463.453.44.44,0,0,0,.466-.453V.925H6.038V.468A.473.473,0,0,1,6.175.137a.46.46,0,0,1,.655,0,.47.47,0,0,1,.138.331v1.4a.464.464,0,0,0,.927,0V.925h2.323V.468a.475.475,0,0,1,.136-.331.462.462,0,0,1,.657,0,.472.472,0,0,1,.136.331v1.4a.465.465,0,0,0,.929,0V.925h.465a1.377,1.377,0,0,1,.983.414,1.406,1.406,0,0,1,.3.447,1.423,1.423,0,0,1,.11.547V3.757Z" transform="translate(44 26.51)" fill="#FFFFFF"/>
              </g>
            </svg>`
  } else {
    return `<svg class="w-4 h-4 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
</svg>
`
  }
}
