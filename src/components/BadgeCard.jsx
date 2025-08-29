import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Eye, Award, Star, CheckCircle } from 'lucide-react';

function BadgeModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={[2, 2, 2]} />;
}

function BadgeCard({ badge, onViewDetails, userProgress, onEarnBadge, onUpdateProgress }) {
  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-500';
      case 'Rare': return 'bg-blue-500';
      case 'Epic': return 'bg-purple-500';
      case 'Legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getRarityIcon = (rarity) => {
    switch (rarity) {
      case 'Legendary': return <Star className="w-3 h-3" />;
      default: return <Award className="w-3 h-3" />;
    }
  };

  // Handle earning a badge
  const handleEarnBadge = () => {
    onEarnBadge(badge.id);
  };

  // Handle updating progress
  const handleUpdateProgress = (newProgress) => {
    onUpdateProgress(badge.id, newProgress);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white border-2 hover:border-primary/20">
      <CardContent className="p-6">
        {/* 3D Model Display */}
        <div className="h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={null}>
              <BadgeModel modelPath={badge.model} />
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                autoRotate
                autoRotateSpeed={2}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Badge Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-gray-900">{badge.name}</h3>
            <Badge className={`${getRarityColor(badge.rarity)} text-white flex items-center gap-1`}>
              {getRarityIcon(badge.rarity)}
              {badge.rarity}
            </Badge>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">{badge.description}</p>

          {/* Progress Bar */}
          {userProgress && !userProgress.earned && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>{userProgress.progress}%</span>
              </div>
              <Progress value={userProgress.progress} className="h-2" />
            </div>
          )}

          {/* Earned Badge Indicator */}
          {userProgress && userProgress.earned && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Earned</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {badge.category}
            </Badge>
            <span className="text-sm font-semibold text-primary">
              {badge.points} pts
            </span>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={() => onViewDetails(badge)}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
            
            {!userProgress.earned && (
              <Button 
                onClick={handleEarnBadge}
                variant="outline"
                className="flex-1"
              >
                <Award className="w-4 h-4 mr-2" />
                Earn
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


