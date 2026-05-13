import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Topics from "./pages/Topics";
import TopicDetail from "./pages/TopicDetail";
import Practice from "./pages/Practice";
import Grammar from "./pages/Grammar";
import GrammarLesson from "./pages/GrammarLesson";
import Profile from "./pages/Profile";
import { useAuth } from "./store/useAuth";
import { useProgress } from "./store/useProgress";

export default function App() {
  const { user, configured, signIn, logOut } = useAuth();
  const { progress, loaded, review, setDailyGoal, resetAll } = useProgress(user?.uid ?? null);

  if (!loaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-zinc-500">Lade …</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home progress={progress} />} />
        <Route path="/themen" element={<Topics progress={progress} />} />
        <Route path="/themen/:topicId" element={<TopicDetail />} />
        <Route path="/uebung" element={<Practice progress={progress} onReview={review} />} />
        <Route path="/grammatik" element={<Grammar />} />
        <Route path="/grammatik/:id" element={<GrammarLesson />} />
        <Route
          path="/profil"
          element={
            <Profile
              progress={progress}
              user={user}
              configured={configured}
              onSignIn={signIn}
              onSignOut={logOut}
              onGoalChange={setDailyGoal}
              onReset={resetAll}
            />
          }
        />
      </Route>
    </Routes>
  );
}
