const content = []

const push = (level, message) => {
    const newLogItem = { createdAt: new Date(), level: level, message: message,}
    
    content.push(newLogItem)
    console.log(`🙉logger ${content.length}: ${newLogItem.createdAt} ${newLogItem.level} ${newLogItem.message}`)
} 

module.exports = { 
    info: (message) => push('🖖info', message),
    warn: (message) => push('🫢warn', message),
    error: (message) => push('🧯error', message),
    fatal: (message) => push('❌fatal', message),
}