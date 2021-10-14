module.exports = (factories) => ({
  createRoutine() {
    return factories.Link.create({
      name: 'myroutine',
      routine: 'testRoutine',
    })
  }
})