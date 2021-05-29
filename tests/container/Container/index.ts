import {Container} from '@roots/container'

describe('container', function () {
  describe('constructor', () => {
    it('is constructable', () => {
      const container = new Container()
      expect(container).toBeInstanceOf(Container)
    })
  })

  describe('get', function () {
    it('returns undefined when no value is set', () => {
      const container = new Container()
      expect(container.get('foo')).toEqual(undefined)
    })

    it('returns the keyed value', () => {
      const repo = {foo: 'bar'}
      const container = new Container(repo)

      expect(container.get('foo')).toBe('bar')
    })
  })

  describe('all', function () {
    it('returns the raw repository', () => {
      const repo = {foo: 'bar', ergo: 'dox'}
      const container = new Container(repo)

      expect(container.all()).toBe(repo)
    })
  })

  describe('set', function () {
    it('returns itself', () => {
      const container = new Container()

      expect(container.set('foo', 'bar')).toBeInstanceOf(
        Container,
      )
    })

    it('sets a value', () => {
      const container = new Container().set('foo', 'bar')

      expect(container.get('foo')).toEqual('bar')
    })
  })

  describe('has', () => {
    it('returns true if item found', () => {
      const container = new Container().set('foo', 'bar')

      expect(container.has('foo')).toEqual(true)
    })

    it('returns false if item not found', () => {
      const container = new Container().set('foo', 'bar')

      expect(container.has('neverSet')).toEqual(false)
    })
  })

  describe('is', function () {
    it('is: returns true if value equals predicate', () => {
      const repo = {test: 100}
      const container = new Container(repo)

      expect(container.is('test', 100)).toEqual(true)
    })

    it('is: returns false if value does not equal predicate', () => {
      const repo = {test: 100}
      const container = new Container(repo)

      expect(container.is('test', 'notIt')).toEqual(false)
    })
  })

  describe('isTrue', function () {
    it('returns true if keyed value is true', () => {
      const repo = {test: true}
      const container = new Container(repo)

      expect(container.isTrue('test')).toEqual(true)
    })

    it('returns false if keyed value is false', () => {
      const repo = {test: false}
      const container = new Container(repo)

      expect(container.isTrue('test')).toEqual(false)
    })

    it('returns false if keyed value is not boolean', () => {
      const repo = {test: 'bar'}
      const container = new Container(repo)

      expect(container.isTrue('test')).toEqual(false)
    })
  })

  describe('isFalse', function () {
    it('returns true if keyed value is false', () => {
      const repo = {test: false}
      const container = new Container(repo)

      expect(container.isFalse('test')).toEqual(true)
    })

    it('returns false if keyed value is true', () => {
      const repo = {test: true}
      const container = new Container(repo)

      expect(container.isFalse('test')).toEqual(false)
    })

    it('returns false if keyed value is not boolean', () => {
      const repo = {test: 'bar'}
      const container = new Container(repo)

      expect(container.isFalse('test')).toEqual(false)
    })
  })

  describe('set', function () {
    it('adds a value to the repository', () => {
      const repo = {foo: 'bar'}
      const container = new Container()

      expect(container.set('foo', 'bar').all()).toEqual(repo)
    })
  })

  describe('isArray', function () {
    it('returns true if value is an array', () => {
      const repo = {foo: ['bar', 'whiz']}
      const container = new Container(repo)

      expect(container.isArray('foo')).toEqual(true)
    })
  })

  describe('isNotArray', function () {
    it('returns true if value is an array', () => {
      const repo = {foo: 'bar'}
      const container = new Container(repo)

      expect(container.isNotArray('foo')).toEqual(true)
    })
  })

  describe('isString', function () {
    it('returns true if value is a String', () => {
      const repo = {foo: 'bar'}
      const container = new Container(repo)

      expect(container.isString('foo')).toEqual(true)
    })
  })

  describe('isNotString', function () {
    it('returns true if value is a String', () => {
      const repo = {foo: ['bar', 'whiz']}
      const container = new Container(repo)

      expect(container.isNotString('foo')).toEqual(true)
    })
  })

  describe('isNumber', function () {
    it('returns true if value is a String', () => {
      const repo = {foo: 100}
      const container = new Container(repo)

      expect(container.isNumber('foo')).toEqual(true)
    })
  })

  describe('isNotNumber', function () {
    it('returns true if value is a Number', () => {
      const repo = {foo: ['bar', 'whiz']}
      const container = new Container(repo)

      expect(container.isNotNumber('foo')).toEqual(true)
    })
  })

  describe('getMap', function () {
    it('returns an instance of Map', () => {
      const repo = {
        key: 'value',
        anotherKey: 'value2',
      }
      const container = new Container(repo)

      expect(container.getMap()).toBeInstanceOf(Map)
    })

    it('returns Map with expected structure', () => {
      const repo = {
        key: 'value',
        anotherKey: 'value2',
      }
      const container = new Container(repo)

      expect(Array.from(container.getMap())).toEqual([
        ['key', 'value'],
        ['anotherKey', 'value2'],
      ])
    })
  })

  describe('the rest', () => {
    it('remove: removes a value', () => {
      const repo = {
        foo: 'bar',
        ergo: 'dox',
      }
      const container = new Container(repo)

      container.remove('foo')

      expect(container.all()).toEqual({
        ergo: 'dox',
      })
    })

    it('setStore: sets the repo value', () => {
      const repo = {
        foo: 'bar',
        ergo: 'dox',
      }
      const container = new Container(repo)

      const replacement = {
        oof: 'yea',
        ben: 'word',
      }
      container.setStore(replacement)

      expect(container.all()).toEqual(replacement)
    })

    it('mergeStore: merges a value', () => {
      const repo = {
        foo: 'bar',
        ergo: 'dox',
      }
      const container = new Container(repo)

      expect(
        container.mergeStore({crash: 'bandicoot'}).all(),
      ).toEqual({
        ...repo,
        crash: 'bandicoot',
      })
    })

    it('getEntries: retrieves repo as entries', () => {
      const repo = {
        foo: 'bar',
        ergo: 'dox',
      }
      const container = new Container(repo)

      expect(container.getEntries()).toEqual([
        ['foo', 'bar'],
        ['ergo', 'dox'],
      ])
    })

    it('fromEntries: sets repo from entries', () => {
      const repo = {
        foo: 'bar',
        ergo: 'dox',
      }
      const container = new Container().fromEntries(
        Object.entries(repo),
      )

      expect(container.all()).toEqual(repo)
    })

    it('findKey: finds matching items', () => {
      const repo = {
        bud: {
          name: 'bud',
          type: 'tooling',
        },
        sage: {
          name: 'sage',
          type: 'theme',
        },
      }
      const container = new Container(repo)

      expect(
        container.findKey(({type}) => type == 'theme'),
      ).toEqual('sage')
    })

    it('findKeyIn: finds matching nested items', () => {
      const repo = {
        deep: {
          name: 'bud',
          type: 'tooling',
          nested: {
            prop: {
              count: 8,
            },
            ergo: {
              count: 12,
            },
            dox: {
              count: undefined,
            },
          },
        },
      }
      const container = new Container(repo)

      expect(
        container.findKeyIn(
          'deep.nested',
          ({count}) => count > 10,
        ),
      ).toEqual('ergo')
    })

    it('getKeys: returns array of keys', () => {
      const repo = {
        key: 'value',
        anotherKey: 'value',
      }
      const container = new Container(repo)

      expect(container.getKeys()).toEqual(Object.keys(repo))
    })

    it('getValues: returns array of values', () => {
      const repo = {
        key: 'value',
        anotherKey: 'value2',
      }
      const container = new Container(repo)

      expect(container.getValues()).toEqual(Object.values(repo))
    })
  })
})

export {}
