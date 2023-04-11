import { useEffect, useState, useRef } from 'react';
import { Image, Platform, Animated } from 'react-native';
import styled from 'styled-components/native';
import { SearchBar, Button } from '@rneui/themed';
import { useDebounce } from 'use-debounce';

export default function Search() {
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [debouncedSearch] = useDebounce(search, 200);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadedImageCount, setLoadedImageCount] = useState<number>(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  function reset() {
    fadeAnim.resetAnimation();
    setResults([]);
    setLoadedImageCount(0);
    setLoading(false);
  }

  useEffect(() => {
    if (search) {
      setLoading(true);
    } else {
      reset();
    }
  }, [search]);

  useEffect(() => {
    reset();

    if (debouncedSearch) {
      searchTeams();
    }
  }, [debouncedSearch]);

  async function searchTeams() {
    const response = await fetch(`${teamEndpoint}/${search}?limit=2`);
    const result = await response.json();

    setResults(result);
  }

  function imagesLoaded() {
    const loaded = loadedImageCount === results.length;
    if (loaded) {
      fadeIn();
    }
    return loaded;
  }

  return (
    <Container
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={50}
    >
      {loading ? (
        <Button
          type="clear"
          loading={true}
          loadingProps={{
            color: 'grey',
          }}
        />
      ) : (
        results.map((result) => (
          <Animated.View key={result._id} style={{ opacity: fadeAnim }}>
            <Result
              style={{
                backgroundColor: imagesLoaded() ? 'white' : 'transparent',
              }}
            >
              <Image
                source={{ uri: result.team?.logo }}
                onLoadEnd={() => {
                  setLoadedImageCount((prevCount) => prevCount + 1);
                }}
                style={{ height: 24, width: 24 }}
              />
              {imagesLoaded() ? <Name>{result.team?.name}</Name> : null}
            </Result>
          </Animated.View>
        ))
      )}
      <SearchBar
        placeholder="Search..."
        onChangeText={setSearch}
        value={search}
        platform="ios"
        containerStyle={{ backgroundColor: 'transparent' }}
      />
    </Container>
  );
}

const Container = styled.KeyboardAvoidingView`
  justify-content: flex-end;
  gap: 12px;
  flex: 1;
  background-color: #eeeeee;
`;

const Result = styled.View`
  padding-left: 12px;
  margin-left: 12px;
  margin-right: 12px;
  height: 54px;
  gap: 12px;
  flex-flow: row;
  align-items: center;
  border-radius: 8px;
`;

const Name = styled.Text`
  font-size: 16px;
`;

const teamEndpoint = `https://tripled.hu/foci/api/team`;
